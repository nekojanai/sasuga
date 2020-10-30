import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { IInstanceConfig } from '@sasuga/api-interfaces';
import { Success } from '@sasuga/remotedata';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationsDisabledGuard implements CanActivate {

  constructor(
    private store: Store<AppState>
  ) {}

  canActivate() {
    return this.store.select(s => s.instanceConfigState).pipe(
      map(v => v instanceof Success ? (v.data as IInstanceConfig).registrationsEnabled : false)
    );
  }

}