import { createAction, props } from '@ngrx/store';

const loadLoginToken = createAction(
  '[Login] Load Login Token'
);

const login = createAction(
  '[Login] Login',
  props<{ username: string, password: string }>()
);

const loginSuccess = createAction(
  '[Login] Success',
  props<{ token: string }>()
);

const loginFailure = createAction(
  '[Login] Failure',
  props<{ error: string }>()
);

export const TokenActions = { login, loginSuccess, loginFailure, loadLoginToken };