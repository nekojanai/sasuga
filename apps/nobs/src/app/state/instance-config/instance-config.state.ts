import { RemoteData, Initial } from '@sasuga/remotedata';
import { IInstanceConfig } from '@sasuga/api-interfaces';

export type InstanceConfigState = RemoteData<IInstanceConfig>;

export const initialInstanceConfigState: InstanceConfigState = new Initial();