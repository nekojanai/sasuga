import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';

@Injectable({
  providedIn: 'root'
})
export class OnlyLoggedInGuard implements CanActivate {

  constructor(
    private store: Store<AppState>
  ) {}

  canActivate() {
    return this.store.select(s => s.profileState?.data?.isAdmin);
  }

}