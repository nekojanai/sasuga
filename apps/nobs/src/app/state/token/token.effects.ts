import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { LoginService } from '../../login/login.service';
import { TokenActions } from './token.actions';
import { setToken, clearToken, getToken } from './token';
import { Router } from '@angular/router';
import { ProfileActions } from '../profile';

@Injectable()
export class TokenEffects {

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(TokenActions.logout),
    tap(_ => {
      clearToken();
      this.router.navigate(['/']);
    }),
    map(_ => ProfileActions.clearProfile())
  ));

  loadLoginToken$ = createEffect(() => this.actions$.pipe(
    ofType(TokenActions.loadLoginToken),
    map(_ => {
      const token = getToken();
      if (token) {
        return TokenActions.loadLoginTokenSuccess({ token });
      } else {
        return TokenActions.noLoginTokenToLoad();
      }
    })
  ));

  loadLoginTokenSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(TokenActions.loadLoginTokenSuccess),
    tap(action => {
      setToken(action.token);
    }),
    map(action => ProfileActions.loadProfile())
  ));

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
    tap(action => {
      setToken(action.token);
      this.router.navigate(['/']);
    }),
    map(action => ProfileActions.loadProfile())
  ));

  loginFailure$ = createEffect(() => this.actions$.pipe(
    ofType(TokenActions.loginFailure),
    tap(_ => clearToken())
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router
  ) {}

}