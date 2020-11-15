import { ClassSerializerInterceptor, Controller, Get, NotFoundException, Query, UnprocessableEntityException, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UsersService } from '../users/users.service';
import { WebfingerService } from './webfinger.service';

@ApiTags('webfinger')
@Controller('.well-known/webfinger')
export class WebfingerController {

  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private webfingerService: WebfingerService
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  get(@Query('resource') resource: string) {
    if(!resource.includes('acct:')) { throw new UnprocessableEntityException() };
    const a = resource.split(':');
    const acct = a[0];
    if(!(acct === 'acct') && a.length === 2) { throw new UnprocessableEntityException() };
    let user = a[1];
    if(user.startsWith('@')) {user = user.substr(1)}
    const [username, domain] = user.split('@',2);
    if(!(this.configService.get('DOMAIN') === domain)) { throw new NotFoundException() };
    return from(this.usersService.findOne({name: username})).pipe(
      tap(u => { if(!u) {throw new NotFoundException()}}),
      map(u => u ? this.webfingerService.createWebfingerForUsername(u.name) : undefined)
    );
  }
}
