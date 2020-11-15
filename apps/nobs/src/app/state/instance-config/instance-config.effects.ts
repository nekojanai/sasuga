import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InstanceConfigActions } from './instance-config.actions';
import { InstanceConfigService } from './instance-config.service';
import { exhaustMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SnackbarService } from '../../snackbar/snackbar.service';

@Injectable()
export class InstanceConfigEffects {

  general$ = createEffect(() => this.actions$.pipe(
    tap(action => this.snackbarService.addMessage(action.type))
  ),{dispatch: false});

  load$ = createEffect(() => this.actions$.pipe(
    ofType(InstanceConfigActions.loadInstanceConfig),
    exhaustMap(action => this.instanceConfigService.get().pipe(
      map(instanceConfig => InstanceConfigActions.loadInstanceConfigSuccess({ instanceConfig })),
      catchError(error => of(InstanceConfigActions.loadInstanceConfigFailure({ error })))
    ))
  ));

  constructor(
    private actions$: Actions,
    private instanceConfigService: InstanceConfigService,
    private snackbarService: SnackbarService
  ) {}
}