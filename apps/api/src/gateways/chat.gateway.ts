import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatGatewayService } from './chat-gateway.service';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
  private logger: Logger = new Logger('Chat Gateway');

  @WebSocketServer() wss: Server;

  constructor(
    private chatGatewayService: ChatGatewayService
  ) {}

  handleConnection(client: Socket, ...args: any[]) {

  }

  async handleDisconnect(client: Socket) {
    const user = this.chatGatewayService.removeUser(client.id);
    if (user) {
      user.partOfRooms.forEach(async room => {
        this.wss.to(room).emit('message', { sender: '', message: `${user.username} left`, hexColor: '' });
        (this.wss.in(room) as any).clients((err, clients) => {
          this.wss.to(room).emit('roomCount', clients.length)
        });
      });
    }
  }

  afterInit(server: Server) {}

  @SubscribeMessage('requestWriteAsGuestInRoom')
  async requestWriteAsGuestInRoom(client: Socket, data: { username: string, room: string }) {
    const user = await this.chatGatewayService.addGuest(client.id, data?.username, data?.room);
    if (user) {
      client.emit('ready');
      this.wss.to(data?.room).emit('message', { sender: '', message: `${user.username} joined`, hexColor: ''});
      (this.wss.in(data?.room) as any).clients((err, clients) => {
        this.wss.to(data?.room).emit('roomCount', clients.length)
      });
    } else {
      client.emit('message', { sender: '' , message: 'You are not allowed to join this chat.', hexColor: ''});
    }
  }

  @SubscribeMessage('requestWriteAsUserInRoom')
  async requestWriteAsUserInRoom(client: Socket, data: { token: string, room: string }) {
    const user = await this.chatGatewayService.addUser(client.id, data?.token, data?.room);
    if (user) {
      client.emit('ready');
      this.wss.to(data?.room).emit('message', { sender: '', message: `${user.username} joined`, hexColor: ''});
      (this.wss.in(data?.room) as any).clients((err, clients) => {
        this.wss.to(data?.room).emit('roomCount', clients.length)
      });
    } else {
      client.emit('message', { sender: '' , message: 'You are not allowed to join this chat.', hexColor: ''});
    }
  }

  @SubscribeMessage('requestReadInRoom')
  requestReadRoom(client: Socket, data: { room: string }) {
    client.join(data?.room);
  }

  @SubscribeMessage('requestLeaveRoom')
  requestLeaveRoom(client: Socket, data: { room: string }) {
    const user = this.chatGatewayService.removeUser(client.id);
    if (user) {
      client.leave(data?.room);
      user.partOfRooms.forEach(async room => {
        this.wss.to(room).emit('message', { sender: '', message: `${user.username} left`, hexColor: '' });
        (this.wss.in(room) as any).clients((err, clients) => {
          this.wss.to(room).emit('roomCount', clients.length)
        });
      });
    }
  }

  @SubscribeMessage('requestEmitRoomCount')
  requestEmitRoomCount(client: Socket, data: { room: string }) {
    (this.wss.in(data?.room) as any).clients((err, clients) => {
      this.wss.to(data?.room).emit('roomCount', clients.length)
    });
  }

  @SubscribeMessage('sendMessageToRoom')
  async sendMessageToRoom(client: Socket, data: { room: string, message: string}) {
    const user = this.chatGatewayService.getUserInRoom(client.id, data?.room);
    if (user) {
      this.wss.to(data?.room).emit('message', { sender: user.username, message: data?.message?.substring(0,128), hexColor: user.hexColor});
      (this.wss.in(data?.room) as any).clients((err, clients) => {
        this.wss.to(data?.room).emit('roomCount', clients.length)
      });
    } else {
      client.emit('message', { sender: '' , message: 'You are not allowed to send messages here.', hexColor: ''});
    }
  }

}
