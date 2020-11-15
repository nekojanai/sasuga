import { ActionReducerMap } from '@ngrx/store';
import * as TokenStore from './token';
import * as InstanceConfigStore from './instance-config';
import * as ProfileStore from './profile';

export interface AppState {
  tokenState: TokenStore.TokenState,
  instanceConfigState: InstanceConfigStore.InstanceConfigState,
  profileState: ProfileStore.ProfileState
}

export const initialAppState: AppState = {
  tokenState: TokenStore.initialTokenState,
  instanceConfigState: InstanceConfigStore.initialInstanceConfigState,
  profileState: ProfileStore.initialProfileState
}

export const appReducers: ActionReducerMap<AppState> = {
  tokenState: TokenStore.tokenReducer,
  instanceConfigState: InstanceConfigStore.instanceConfigReducer,
  profileState: ProfileStore.profileReducer
}

export const appEffects: Array<any> = [
  TokenStore.TokenEffects,
  InstanceConfigStore.InstanceConfigEffects,
  ProfileStore.ProfileEffects
];

export const getTokenState = (s: AppState) => s.tokenState;
export const getInstanceConfigState = (s: AppState) => s.instanceConfigState;
export const getProfileState = (s: AppState) => s.profileState;