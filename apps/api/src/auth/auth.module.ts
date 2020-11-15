import { Module } from '@nestjs/common';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { InstanceConfigModule } from '../instance-config/instance-config.module';
import { JwtAdminStrategy } from './strategies/jwt-admin.strategy';

@Module({
  imports: [
    InstanceConfigModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: '4h'
          }
        });
      },
      inject: [ConfigService]
    })
  ],
  exports: [
    AuthService
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    JwtAdminStrategy,
    AuthService
  ],
  controllers: [AuthController]
})
export class AuthModule {}
