import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy,'jwt-admin') {

  constructor(
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOne(payload.sub);
    if (user) {
      if (user.isAdmin) {
        return { id: payload.sub };
      } else {
        throw new UnauthorizedException('nah man');
      }
    } else {
      throw new UnauthorizedException('nah man');
    }
  }
}