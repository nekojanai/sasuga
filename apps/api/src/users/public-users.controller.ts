import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { tap } from 'rxjs/operators';
import { ActivityPubService } from './activity-pub.service';

@ApiTags('activitypub')
@Controller('api/v1/users')
export class PublicUsersController {

  constructor(
    private activityPubService: ActivityPubService
  ) {}

  @Get(':username')
  getActor(@Param('username') username: string) {
    return this.activityPubService.getActor(username).pipe(
      tap(actor => {if(!actor) {throw new NotFoundException()}})
    )
  }

  @Get(':username/followers')
  getFollowers(@Param('username') username: string) {
    
  }

  @Post(':username/inbox')
  inbox(@Param('username') username: string, @Body() data) {
    
  }
}
