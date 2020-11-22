import { Body, Controller, Get, Logger, NotFoundException, Param, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { tap } from 'rxjs/operators';
import { ActivityPubService } from './activity-pub.service';

@ApiTags('activitypub')
@Controller('api/v1/users')
export class PublicUsersController {

  private logger = new Logger('activitypub');

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
  getFollowers(@Param('username') username: string, @Req() req) {
    this.logger.log(req);
  }

  @Post(':username/inbox')
  inbox(@Param('username') username: string, @Body() data: any, @Req() req) {
    this.logger.log(JSON.stringify(data));
    this.logger.log(JSON.stringify(req))
  }
}
