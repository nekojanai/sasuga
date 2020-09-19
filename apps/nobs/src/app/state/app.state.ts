import * as TokenStore from './token'
import { ActionReducerMap } from '@ngrx/store'

export interface AppState {
  tokenState: TokenStore.TokenState
}

export const initialAppState: AppState = {
  tokenState: TokenStore.initialTokenState
}

export const appReducers: ActionReducerMap<AppState> = {
  tokenState: TokenStore.tokenReducer
}

export const appEffects: Array<any> = [
  TokenStore.TokenEffects,
];

export const getTokenState = (s: AppState) => s.tokenState;