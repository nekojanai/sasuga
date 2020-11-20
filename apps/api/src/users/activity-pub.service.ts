import { Injectable } from "@nestjs/common";
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { UsersService } from './users.service';

@Injectable()
export class ActivityPubService {

  domain = environment.DOMAIN;

  constructor(
    private usersService: UsersService
  ) {}

  getActor(username: string) {
    return from(this.usersService.findOne({name: username})).pipe(
      map(user => {
        if(user) {
          return {
            '@context': [
              'https://www.w3.org/ns/activitystreams',
              'https://w3id.org/security/v1'
            ],
            'id': `https://${this.domain}/api/v1/users/${user.name}`,
            'type': 'Person',
            'preferredUsername': `${user.name}`,
            'name': `${user.name}`,
            'inbox': `https://${this.domain}/api/v1/users/${user.name}/inbox`,
            'followers': `https://${this.domain}/api/v1/users/${user.name}/followers`,
            'publicKey': {
              'id': `https://${this.domain}/api/v1/users/${user.name}#main-key`,
              'owner': `https://${this.domain}/api/v1/users/${user.name}`,
              'publicKeyPem': user.pubkey
            }
          };
        } else {
          return undefined;
        }
      })
    )
  }
}