import { createAction, props } from '@ngrx/store';
import { IInstanceConfig } from '@sasuga/api-interfaces';

const loadInstanceConfig = createAction(
	'[InstaneConfig] Load'
);

const loadInstanceConfigSuccess = createAction(
	'[InstanceConfig] Success',
	props<{ instanceConfig: IInstanceConfig }>()
);

const loadInstanceConfigFailure = createAction(
	'[InstanceConfig] Failure',	
	props<{ error: string }>()
);

export const InstanceConfigActions = {
	loadInstanceConfig,
	loadInstanceConfigSuccess,
	loadInstanceConfigFailure
};