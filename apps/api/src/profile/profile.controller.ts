import { Controller, Get, UseGuards, Request, UseInterceptors, ClassSerializerInterceptor, Patch, Body, Post, UploadedFiles, Query, Delete, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { from } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadsService } from '../uploads/uploads.service';
import { paginate } from 'nestjs-typeorm-paginate';

@ApiTags('profile')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('api/v1/profile')
export class ProfileController {

  constructor(
    private usersService: UsersService,
    private uploadsService: UploadsService
  ) {}

  @ApiOkResponse({ type: User })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  get(@Request() req) {
    return from(this.usersService.repo.findOne(req.user.id)).pipe(
      map(user => ({...user, password: '', privkey: ''}))
    );
  }

  @ApiOkResponse({ type: User })
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('reset-password')
  updatePassword(@Request() req, @Body() data: UpdatePasswordDto) {
    return from(this.usersService.repo.update(req.user.id, data)).pipe(
      exhaustMap(_ => this.usersService.repo.findOne(req.user.id))
    );
  }

  @ApiOkResponse({ type: User })
  @Post('reset-streamkey')
  resetStreamKey(@Request() req) {
    return from(this.usersService.repo.update(req.user.id, { streamkey: ''})).pipe(
      exhaustMap(_ => this.usersService.repo.findOne(req.user.id))
    );
  }

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files'))
  upload(@UploadedFiles() files, @Request() req) {
    return this.usersService.repo.findOne(req.user.id)
    .then(user => {
      if (user) {
        return this.uploadsService.upload(files, user);
      }
    })
  }

  @Get('uploads')
  getUploads(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
    ) {
    return paginate(this.uploadsService.uploadRepo, { page, limit }, { order: { createdAt: "DESC"}});
  }

  @Delete('uploads')
  deleteUpload(@Request() req, @Body() data: { names: string[], ids: string[] }) {
    return this.usersService.findOne(req.user.id)
    .then(user => {
      if (user) {
        return this.uploadsService.uploadRepo.delete(data?.ids)
        .then(_ => this.uploadsService.remove(data?.names, user));
      }
    });
  }

}
