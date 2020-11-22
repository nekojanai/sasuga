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
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Like } from 'typeorm';

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
  @Patch()
  update(@Request() req, @Body() data: UpdateProfileDto) {
    return from(this.usersService.repo.update(req.user.id, data)).pipe(
      exhaustMap(_ => this.usersService.repo.findOne(req.user.id))
    );
  }

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
    @Query('limit') limit: number = 10,
    @Query('mimetypelike') mimetypelike: string
    ) {
    console.log(mimetypelike)
    if (mimetypelike && mimetypelike !== 'undefined') {
      return paginate(this.uploadsService.uploadRepo, { page, limit }, { where: { owner: req.user.id, mimetype: Like(`%${mimetypelike}%`)}, order: { createdAt: "DESC"}});
    }
    return paginate(this.uploadsService.uploadRepo, { page, limit }, { where: { owner: req.user.id }, order: { createdAt: "DESC"}});
  }

  @Delete('uploads/:filename')
  deleteUpload(@Request() req, @Param('filename') filename: string) {
    return this.usersService.findOne(req.user.id)
    .then(user => {
      if (user) {
        return this.uploadsService.uploadRepo.delete({ filename })
        .then(_ => this.uploadsService.remove([filename], user));
      }
    });
  }

}
