import { RemoteData, Initial } from '@sasuga/remotedata';

export type TokenState = RemoteData<string>;

export const initialTokenState: TokenState = new Initial();