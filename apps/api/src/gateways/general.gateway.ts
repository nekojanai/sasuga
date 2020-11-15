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
    this.logger.log(`Client ${client.id} disconnected.`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client ${client.id} connected.`)
  }

  afterInit(server: Server) {}

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    this.logger.log('got'+payload);
    return 'Hello world!';
  }
}
