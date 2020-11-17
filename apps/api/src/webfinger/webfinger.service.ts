import { Injectable } from '@nestjs/common';
import { environment } from '../environments/environment';

@Injectable()
export class WebfingerService {

  domain = environment.DOMAIN;

  constructor() {}

  createWebfingerForUsername(username: string) {
    return {
      'subject': `acct:${username}@${this.domain}`,
      'links': [
        {
          'rel': 'self',
          'type': 'application/activity+json',
          'href': `https://${this.domain}/api/v1/users/${username}`
        }
      ]
    };
  }
}
