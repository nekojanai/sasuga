import { createReducer, Action, on } from "@ngrx/store";
import { initialTokenState, TokenState } from "./token.state";
import { TokenActions } from './token.actions';
import { Loading, Success, Failure } from '@sasuga/remotedata';

const _tokenReducer = createReducer(
  initialTokenState,
  on( TokenActions.loadLoginToken, () => new Loading(undefined) ),
  on( TokenActions.login, () => new Loading(undefined) ),
  on( TokenActions.loginSuccess, (state, { token }) => new Success(token) ),
  on( TokenActions.loginFailure, (state, { error }) => new Failure(undefined, error) ),
);

export function tokenReducer( state: TokenState | undefined, action: Action ) {
  return _tokenReducer( state, action );
}