import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { tap } from 'rxjs/operators';
import { Socket, Server } from 'socket.io';
import { GeneralGatewayService } from './general-gateway.service';

@WebSocketGateway({ namespace: '/general' })
export class GeneralGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
  private logger: Logger = new Logger('General Gateway');

  @WebSocketServer() wss: Server;

  generalCommandPipe = this.generalGatewayService.commands;

  constructor(
    private generalGatewayService: GeneralGatewayService
  ) {
    this.generalCommandPipe.pipe(
      tap(command => this.wss.emit(command?.command, command?.args))
    ).subscribe();
  }

  handleDisconnect(client: Socket) {
  }

  handleConnection(client: Socket, ...args: any[]) {
    (client as any)._user = 'nyaaa~';
  }

  afterInit(server: Server) {}

  @SubscribeMessage('hey')
  hey(client: any, data: any) {
    client.emit('hey', (client as any)._user);
  }

}
