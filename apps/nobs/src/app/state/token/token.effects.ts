import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { LoginService } from '../../login/login.service';
import { TokenActions } from './token.actions';
import { setToken, clearToken } from './token';

@Injectable()
export class TokenEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(TokenActions.login),
    exhaustMap(action =>
      this.loginService.login(action.credentials).pipe(
        map(response => TokenActions.loginSuccess({ token: response.token })),
        catchError(error => of(TokenActions.loginFailure({ error })))
      )
    )
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(TokenActions.loginSuccess),
    tap(action => setToken(action.token))
  ), { dispatch: false });

  loginFailure$ = createEffect(() => this.actions$.pipe(
    ofType(TokenActions.loginFailure),
    tap(_ => clearToken())
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private loginService: LoginService
  ) {}

}