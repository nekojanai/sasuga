import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { User } from '../users/user.entity';

@Injectable()
export class StreamsService {

  constructor(
    private usersService: UsersService
  ) {}

  getAllCurrentlyStreaming(options: IPaginationOptions): Promise<Pagination<User>> {
    return paginate(this.usersService.repo, options, { where: { isStreaming: true } });
  }

  getUser(name: string) {
    return this.usersService.findOne({name});
  }

  validateStreamKey(streamkey: string) {
    return this.usersService.isStreamingIfStreamkeyValid(streamkey);
  }

  stoppedStreaming(streamkey: string) {
    return this.usersService.stoppedStreaming(streamkey);
  }
}
