import { Module } from '@nestjs/common';
import { GatewayModule } from '../gateways/gateway.module';
import { UsersModule } from '../users/users.module';
import { StreamsController } from './streams.controller';
import { StreamsService } from './streams.service';

@Module({
  imports: [
    UsersModule,
    GatewayModule
  ],
  controllers: [StreamsController],
  providers: [StreamsService]
})
export class StreamsModule {}
