import { Module } from '@nestjs/common';
import { WebfingerService } from './webfinger.service';
import { WebfingerController } from './webfinger.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule,
    UsersModule
  ],
  providers: [WebfingerService],
  controllers: [WebfingerController]
})
export class WebfingerModule {}
