import {
  Pipe,
  PipeTransform
} from '@angular/core';
import {
  RemoteData,
  Initial,
  Loading,
  Success,
  Failure
} from './remotedata';

const assertIsRemoteData = (rd: unknown) => {
  if (!( rd instanceof RemoteData )) {
    throw new Error(`Value ${rd} is not a RemoteData<T> instance. Did you forget to use the async pipe? i.e: state$ | async | isInitial`);
  }
}

@Pipe({ name: 'isInitial' })
export class IsInitialPipe implements PipeTransform {
  transform(rd: RemoteData<any, any>) {
    assertIsRemoteData(rd);
    return rd instanceof Initial;
  }
}

@Pipe({ name: 'isLoading' })
export class IsLoadingPipe implements PipeTransform {
  transform(rd: RemoteData<any, any>) {
    assertIsRemoteData(rd);
    return rd instanceof Loading;
  }
}

@Pipe({ name: 'isSuccess' })
export class IsSuccessPipe implements PipeTransform {
  transform(rd: RemoteData<any, any>) {
    assertIsRemoteData(rd);
    return rd instanceof Success;
  }
}

@Pipe({ name: 'isFailure' })
export class IsFailurePipe implements PipeTransform {
  transform(rd: RemoteData<any, any>) {
    assertIsRemoteData(rd);
    return rd instanceof Failure; 
  }
}