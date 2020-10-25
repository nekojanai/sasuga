import { createReducer, Action, on } from '@ngrx/store';
import { initialInstanceConfigState, InstanceConfigState } from './instance-config.state';
import { InstanceConfigActions } from './instance-config.actions';
import { Loading, Success, Failure } from '@sasuga/remotedata';

const _instanceConfigReducer = createReducer(
  iniitalInstanceConfigState,
  on( InstanceConfigActions.loadInstanceConfig, () => new Loading() ),
  on( InstanceConfigActions.loadInstanceConfigSuccess, (state, { instanceConfig }) => new Success(instanceConfig)),
  on( InstanceConfigActions.loadInstanceConfigFailure, (state, { error }) => new Failure(undefined, error)),
);

export function instanceConfigReducer( state: InstanceConfigState | undefined, action: Action ) {
  return _instanceConfigReducer( state, action );
}