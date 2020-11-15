import { createAction, props } from '@ngrx/store';
import { IUser } from '@sasuga/api-interfaces';

const clearProfile = createAction(
  '[Profile] Clear'
);

const loadProfile = createAction(
  '[Profile] Load'
);

const loadProfileSuccess = createAction(
  '[Profile] Load Success',
  props<{ profile: IUser }>()
);

const loadProfileFailure = createAction(
  '[Profile] Load Failure',
  props<{ error: string }>()
);

export const ProfileActions = {
  loadProfile,
  loadProfileSuccess,
  loadProfileFailure,
  clearProfile
};