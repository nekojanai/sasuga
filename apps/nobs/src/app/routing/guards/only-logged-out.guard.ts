import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Success } from '@sasuga/remotedata';
import { AppState } from '../../state/app.state';

@Injectable({
  providedIn: 'root'
})
export class OnlyLoggedOutGuard implements CanActivate {

  constructor(
    private store: Store<AppState>
  ) {}

  canActivate() {
    return this.store.select(s => !(s.tokenState instanceof Success));
  }

}