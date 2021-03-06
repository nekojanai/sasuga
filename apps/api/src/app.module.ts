import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { AuthModule } from './auth/auth.module';
import { InstanceConfigModule } from './instance-config/instance-config.module';
import { ProfileModule } from './profile/profile.module';
import { StreamsModule } from './streams/streams.module';
import { GatewayModule } from './gateways/gateway.module';
import { WebfingerModule } from './webfinger/webfinger.module';
import { UploadsModule } from './uploads/uploads.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    InstanceConfigModule,
    UsersModule,
    DatabaseModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'nobs'),
      exclude: ['/api*']
    }),
    UsersModule,
    AuthModule,
    ProfileModule,
    StreamsModule,
    GatewayModule,
    WebfingerModule,
    UploadsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
