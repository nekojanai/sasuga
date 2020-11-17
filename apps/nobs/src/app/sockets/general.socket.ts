import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../environments/environment';

@Injectable()
export class GeneralSocket extends Socket {

  constructor() {
    super({ url: `${environment.WS_BASE_URL}/general`, options: {} });
  }

}