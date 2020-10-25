import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InstanceConfigActions } from './instance-config.actions';
import { InstanceConfigService } from './instance-config.service';
import { exhaustMap, catchError, map } from 'rxjs/operators';
 
@Injectable()
export class InstanceConfigEffects {

  load$ = createEffect(() => this.actions$.pipe(
    ofType(InstanceConfigActions.loadInstanceConfig),
    exhaustMap(action =>
      this.instanceConfigService.load().pipe(
        map(response => InstanceConfigActions.loadInstanceConfigSuccess({ instanceConfig: response })),
        catchError(error => of(InstanceConfigActions.loadInstanceConfigFailure({ error })))
      )  
    )
  ));

  constructor(
    private actions$: Actions,
    private instanceConfigService: InstanceConfigService
  ) {}
}