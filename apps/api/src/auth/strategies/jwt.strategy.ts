import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { environment } from '../../environments/environment';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {

  constructor(
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.JWT_SECRET
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOne(payload.sub);
    if (user && user.isActive) {
      return { id: payload.sub };
    } else {
      throw new UnauthorizedException('nah man');
    }
  }
}