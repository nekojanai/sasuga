import { createReducer, Action, on } from "@ngrx/store";
import { initialTokenState, TokenState } from "./token.state";
import { TokenActions } from './token.actions';
import { Loading, Success, Failure, Initial } from '@sasuga/remotedata';

const _tokenReducer = createReducer(
  initialTokenState,
  on( TokenActions.logout, () => new Initial()),
  on( TokenActions.loadLoginToken, () => new Loading(undefined) ),
  on( TokenActions.loadLoginTokenSuccess, (_, { token }) => new Success(token) ),
  on( TokenActions.noLoginTokenToLoad, () => new Initial() ),
  on( TokenActions.login, () => new Loading(undefined) ),
  on( TokenActions.loginSuccess, (_, { token }) => new Success(token) ),
  on( TokenActions.loginFailure, (_, { error }) => new Failure(undefined, error) ),
);

export function tokenReducer( state: TokenState | undefined, action: Action ) {
  return _tokenReducer( state, action );
}