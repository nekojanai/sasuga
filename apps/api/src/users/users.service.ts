import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {

  constructor(
    @InjectRepository(UserRepository)
    public repo: UserRepository
  ) {
    super(repo);
  }

  validate(name: string, password: string) {
    return this.repo.findOneAndValidateCredentials(name, password);
  }

  register(data: CreateUserDto) {
    const newUser = this.repo.create(data);
    return from(this.repo.save(newUser));
  }
  
}
