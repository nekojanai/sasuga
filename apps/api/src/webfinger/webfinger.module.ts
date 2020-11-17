import { Module } from '@nestjs/common';
import { WebfingerService } from './webfinger.service';
import { WebfingerController } from './webfinger.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule
  ],
  providers: [WebfingerService],
  controllers: [WebfingerController]
})
export class WebfingerModule {}
