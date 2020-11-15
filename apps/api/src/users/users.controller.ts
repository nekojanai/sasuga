import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CrudController, Crud } from '@nestjsx/crud';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReplaceUserDto } from './dto/replace-user.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt-admin'))
@ApiTags('admin/users')
@Crud({
  model: {
    type: User,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true
    }
  },
  dto: {
    create: CreateUserDto,
    update: UpdateUserDto,
    replace: ReplaceUserDto
  }
})
@Controller('api/v1/admin/users')
export class UsersController implements CrudController<User> {

  constructor(
    public service: UsersService
  ) {}

  @Post(':id/ban')
  banUser(@Param('id') id: string) {
    return this.service.setInactiveAndEndStream(id);
  }

}
