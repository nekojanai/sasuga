import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Observable, of, from } from 'rxjs';
import { map, concatMap, exhaustMap, catchError } from 'rxjs/operators';
import { RegisterDto } from './dto/register.dto';
import { InstanceConfigService } from '../instance-config/instance-config.service';
import { User } from '../users/user.entity';
import { RegisterResponseDto } from './dto/register-response.dto';

@Injectable()
export class AuthService {

  constructor(
    private istanceConfigService: InstanceConfigService,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  validateTokenGetUser(token: string) {
    return from(this.jwtService.verifyAsync(token)).pipe(
      catchError(err => of(undefined)),
      exhaustMap(verifyResult => {
        return verifyResult ? this.usersService.findOne(verifyResult.sub) : of(undefined);
      })
    )
  }

  validateCredentialsAndIssueToken(name: string, password: string): Observable<any> {
    return this.usersService.validate(name, password).pipe(
      map(user => user ? { token: this.jwtService.sign({ sub: user.id }) } : undefined )
    );
  }

  registerIfEnabled(data: RegisterDto): Observable<RegisterResponseDto> {
    return this.istanceConfigService.getOrCreate().pipe(
      concatMap(config => {
        if (config && config.registrationsEnabled) {
          return this.usersService.findOne({name: data.name});
        } else {
          throw new HttpException('Registrations are disabled.', HttpStatus.FORBIDDEN);
        }
      }),
      concatMap(user => {
        if (!user) {
          return this.usersService.register(data);
        } else {
          throw new HttpException('User already exists.', HttpStatus.FORBIDDEN);
        }
      }),
      map(user => {
        if (user && user instanceof User) {
          return new RegisterResponseDto({...user, token: this.jwtService.sign({ sub: user.id })});
        } else {
          throw new HttpException('Something went wrong *shrugs*', HttpStatus.FORBIDDEN);
        }
      })
    );
  }
}
