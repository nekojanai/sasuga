import { createAction, props } from '@ngrx/store';
import { ILoginDto } from '@sasuga/api-interfaces';

const logout = createAction(
  '[Login] Logout'
);

const loadLoginToken = createAction(
  '[Login] Load Token'
);

const loadLoginTokenSuccess = createAction(
  '[Login] Load Token Success',
  props<{ token: string }>()
);

const noLoginTokenToLoad = createAction(
  '[Login] No Token To Load'
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

export const TokenActions = { login, loginSuccess, loginFailure, loadLoginToken, noLoginTokenToLoad, logout, loadLoginTokenSuccess };