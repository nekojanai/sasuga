import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TokenActions } from './token.actions';

@Injectable()
export class TokenEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(TokenActions.login),
  ))

  constructor(
    private actions$: Actions,
  ) {}

}