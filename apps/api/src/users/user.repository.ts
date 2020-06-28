import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Crypto from 'crypto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  findOneAndValidateCredentials(name: string, password: string) {
    return from(this.findOne({name})).pipe(
      map(user => user && user.password === this.hashPassword(password) ? user : undefined)
    );
  }

  private hashPassword(passwordPlain: string) {
    return Crypto.createHmac('sha512', passwordPlain).digest('hex');
  }

}