import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { environment } from '../../environments/environment';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy,'jwt-admin') {

  constructor(
    private usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.JWT_SECRET
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOne(payload.sub);
    if (user && user.isActive && user.isAdmin) {
      return { id: payload.sub };
    } else {
      throw new UnauthorizedException('nah man');
    }
  }
}