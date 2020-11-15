import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ProfileActions } from './profile.actions';
import { ProfileService } from './profile.service';

@Injectable()
export class ProfileEffects {

  load$ = createEffect(() => this.actions$.pipe(
    ofType(ProfileActions.loadProfile),
    exhaustMap(action => this.profileService.getProfile().pipe(
      map(profile => ProfileActions.loadProfileSuccess({ profile })),
      catchError(error => of(ProfileActions.loadProfileFailure({ error })))
    ))
  ));

  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) {}
}