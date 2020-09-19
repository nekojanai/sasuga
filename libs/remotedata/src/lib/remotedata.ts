export enum RemoteDataStatus {
  Initial,
  Loading,
  Success,
  Failure
}

export class RemoteData<T, E = string> {
  status: RemoteDataStatus;
  data?: T;
  error?: E;
}

export class Initial extends RemoteData<any> {
  status = RemoteDataStatus.Initial;
}

export class Loading<T> extends RemoteData<T> {
  status = RemoteDataStatus.Loading;

  constructor(public data: T) {
    super();
  }
}

export class Success<T> extends RemoteData<T> {
  status = RemoteDataStatus.Success;

  constructor(public data: T) {
    super();
  }
}

export class Failure<T, E = string> extends RemoteData<T, E> {
  status = RemoteDataStatus.Failure;

  constructor(public data: T, public error: E) {
    super();
  }
}