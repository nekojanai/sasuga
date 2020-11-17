import { Module } from '@nestjs/common';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { InstanceConfigModule } from '../instance-config/instance-config.module';
import { JwtAdminStrategy } from './strategies/jwt-admin.strategy';
import { environment } from '../environments/environment';

@Module({
  imports: [
    InstanceConfigModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: environment.JWT_SECRET,
      signOptions: {
        expiresIn: '4h'
      }
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
