import { createReducer, Action, on } from '@ngrx/store';
import { Failure, Initial, Loading, Success } from '@sasuga/remotedata';
import { ProfileActions } from './profile.actions';
import { initialProfileState, ProfileState } from './profile.state';

const _profileReducer = createReducer(
  initialProfileState,
  on( ProfileActions.loadProfile, (state) => new Loading(state.data)),
  on( ProfileActions.loadProfileSuccess, (_, {profile}) => new Success(profile)),
  on( ProfileActions.loadProfileFailure, (state, {error}) => new Failure(state.data, error)),
  on( ProfileActions.clearProfile, (state) => new Initial())
);

export function profileReducer( state: ProfileState | undefined, action: Action ) {
  return _profileReducer( state, action );
}