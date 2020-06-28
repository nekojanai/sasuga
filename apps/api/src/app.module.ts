import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { AuthModule } from './auth/auth.module';
import { InstanceConfigModule } from './instance-config/instance-config.module';

@Module({
  imports: [
    InstanceConfigModule,
    UsersModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: [
    ConfigService
  ]
})
export class AppModule {}
