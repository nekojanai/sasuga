import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { CustomLoggerModule } from '../custom-logger/custom-logger.module';
import { RTMPService } from './rtmp.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule,
    CustomLoggerModule,
    UsersModule
  ],
  controllers: [],
  providers: [RTMPService]
})
export class RTMPModule {}