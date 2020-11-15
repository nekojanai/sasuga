import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WebfingerService {

  domain: string;

  constructor(
    private configService: ConfigService
  ) {
    this.domain = this.configService.get('DOMAIN');
  }

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
