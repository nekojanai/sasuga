import { createAction, props } from '@ngrx/store';
import { ILoginDto } from '@sasuga/api-interfaces';

const loadLoginToken = createAction(
  '[Login] Load Login Token'
);

const login = createAction(
  '[Login] Login',
  props<{ credentials: ILoginDto }>()
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