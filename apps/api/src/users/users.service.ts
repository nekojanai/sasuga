import { HttpService, Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { from, of } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {

  private NGINX_CONTROL_BAN_URL = environment.NGINX_CONTROL_URL+'/drop/client';

  constructor(
    @InjectRepository(UserRepository)
    public repo: UserRepository,
    private http: HttpService
  ) {
    super(repo);
  }

  setInactiveAndEndStream(id: string) {
    return from(this.repo.findOne(id)).pipe(
      exhaustMap(user => this.repo.update(id, {isActive: false, isStreaming: false})),
      exhaustMap(result => this.repo.findOne(id)),
      exhaustMap(user => this.http.get(this.NGINX_CONTROL_BAN_URL+'?app=app&name='+user.name, {headers: {Authorization: 'Basic '+environment.NGINX_CONTROL_AUTH_BASE64}}))
    );
  }

  isStreamingIfStreamkeyValid(streamkey: string) {
    return this.repo.findOneAndValidateStreamKey(streamkey).pipe(
      exhaustMap(user => user ? from(this.repo.update(user.id, {isStreaming: true})).pipe(
        exhaustMap(_ => this.findOne(user.id))
      ) : of(undefined))
    );
  }

  stoppedStreaming(streamkey: string) {
    return this.repo.findOneAndValidateStreamKey(streamkey).pipe(
      exhaustMap(user => user ? from(this.repo.update(user.id, {isStreaming: false})).pipe(
        exhaustMap(_ => this.repo.findOne(user.id))
      ) : of(undefined))
    );
  }

  validate(name: string, password: string) {
    return this.repo.findOneAndValidateCredentials(name, password);
  }

  register(data: CreateUserDto) {
    const newUser = this.repo.create(data);
    return from(this.repo.save(newUser));
  }
  
}
