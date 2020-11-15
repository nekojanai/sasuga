import { RemoteData, Initial } from '@sasuga/remotedata';
import { IUser } from '@sasuga/api-interfaces';

export type ProfileState = RemoteData<IUser>;

export const initialProfileState: ProfileState = new Initial();