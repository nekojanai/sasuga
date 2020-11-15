import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { WS_BASE_URL } from '../config';

@Injectable()
export class GeneralSocket extends Socket {

  constructor() {
    super({ url: `${WS_BASE_URL}/general`, options: {} });
  }

}