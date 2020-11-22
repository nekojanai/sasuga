import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { ChatGatewayService } from './chat-gateway.service';
import { ChatGateway } from './chat.gateway';
import { GeneralGatewayService } from './general-gateway.service';
import { GeneralGateway } from './general.gateway';

@Module({
  imports: [
    AuthModule,
    UsersModule
  ],
  providers: [
    ChatGateway,
    GeneralGateway,
    GeneralGatewayService,
    ChatGatewayService
  ],
  exports: [
    GeneralGatewayService
  ]
})
export class GatewayModule {}
