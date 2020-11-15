import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { ChatGatewayService } from './chat-gateway.service';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
  private logger: Logger = new Logger('Chat Gateway');

  @WebSocketServer() wss: Server;

  constructor(
    private authService: AuthService,
    private chatGatewayService: ChatGatewayService
  ) {}

  handleDisconnect(client: Socket) {
    const user = this.chatGatewayService.removeUser(client.id);
    if (user) {
      user.partOfRooms.forEach(room => {
        this.wss.to(room).emit('message', { sender: '', message: `${user.username} left` });
      });
    }
  }

  handleConnection(client: Socket, ...args: any[]) {
    const user = this.chatGatewayService.addUser(client.id);
  }

  afterInit(server: Server) {}

  @SubscribeMessage('sendMessage')
  sendMessageToRoom(client: Socket, data: { message: string, room: string }) {
    const user = this.chatGatewayService.isInRoom(client.id, data.room);
    if (user) {
      this.wss.to(data.room).emit('message', { sender: user.username, message: data.message });
      client.emit('ready');
    }
  }

  @SubscribeMessage('joinRoomWithToken')
  joinRoomWithToken(client: Socket, data: { room: string, token: string }) {
    this.authService.validateTokenGetUser(data.token).subscribe(user => {
      if (user && user.isActive) {
        this.chatGatewayService.addUser(client.id);
        this.chatGatewayService.addUserToRoom(client.id, data.room);
        this.chatGatewayService.setUsername(client.id, user.name);
        client.join(data.room);
        this.wss.to(data.room).emit('message', { sender: '', message: `${user.name} joined` });
        client.emit('ready');
      }
    });
  }

  @SubscribeMessage('joinRoomAsGuest')
  joinRoomAsGuest(client: Socket, data: { room: string, name:string }) {
    this.chatGatewayService.addUser(client.id);
    this.chatGatewayService.addUserToRoom(client.id, data.room);
    const guest = this.chatGatewayService.setUsername(client.id,`[Guest]${data.name ? data.name.replace(/[\W_]/gi,'').toLowerCase() : Math.random()}`);
    if (guest) {
      client.join(data.room);
      this.wss.to(data.room).emit('message', { sender: '', message: `${guest.username} joined` });
      client.emit('ready');
    }
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(client: Socket, data: { room: string }) {
    const result = this.chatGatewayService.removeUserFromRoom(client.id, data.room);
    if (result) {
      client.leave(data.room);
      this.wss.to(data.room).emit('message', { sender: '', message: `${result.username} left` });
      client.emit('ready');
    }
  }
}
