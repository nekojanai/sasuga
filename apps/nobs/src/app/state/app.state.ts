import * as TokenStore from './token';
import * as InstanceConfigStore from './instance-config';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  tokenState: TokenStore.TokenState,
  instanceConfigState: InstanceConfigStore.InstanceConfigState
}

export const initialAppState: AppState = {
  tokenState: TokenStore.initialTokenState,
  instanceConfigState: InstanceConfigStore.initialInstanceConfigState
}

export const appReducers: ActionReducerMap<AppState> = {
  tokenState: TokenStore.tokenReducer,
  instanceConfigState: InstanceConfigStore.instanceConfigReducer
}

export const appEffects: Array<any> = [
  TokenStore.TokenEffects,
  InstanceConfigStore.InstanceConfigEffects
];

export const getTokenState = (s: AppState) => s.tokenState;
export const getInstanceConfigState = (s: AppState) => s.instanceConfigState;