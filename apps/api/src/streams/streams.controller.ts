import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Query, UseInterceptors, Response } from '@nestjs/common';
import { User } from '../users/user.entity';
import { StreamsService } from './streams.service';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { ApiTags } from '@nestjs/swagger';
import { map, tap } from 'rxjs/operators';
import * as express from 'express';
import { GeneralGatewayService } from '../gateways/general-gateway.service';

@ApiTags('streams')
@Controller('api/v1/streams')
export class StreamsController {

  constructor(
    private streamsService: StreamsService,
    private generalGatewayService: GeneralGatewayService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getCurrentlyStreaming(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<Pagination<User>> {
    return this.streamsService.getAllCurrentlyStreaming({page, limit});
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('u/:name')
  getUser(@Param('name') name: string) {
    return this.streamsService.getUser(name);
  }

  @Post('onpublish')
  onPublish(@Body() data, @Response() res: express.Response) {
    return this.streamsService.validateStreamKey(data.name).pipe(
      map(user => {
        if (user && user.isActive) {
          this.generalGatewayService.issueCommand({ command: 'newStream', args: { username: user.name }});
          return res.redirect(303, user.name);
        } else {
          return res.status(404).send('Not found.');
        }
      })
    )
  }

  @Post('onpublishdone')
  onPublishDone(@Body() data) {
    return this.streamsService.stoppedStreaming(data.name).pipe(
      tap(user => this.generalGatewayService.issueCommand({ command: 'endStream', args: { username: user.name }}))
    );
  }
}
