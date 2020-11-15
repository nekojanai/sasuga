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

export class Initial<T, E = string> extends RemoteData<T, E> {
  status = RemoteDataStatus.Initial;
}

export class Loading<T, E = string> extends RemoteData<T , E> {
  status = RemoteDataStatus.Loading;

  constructor(public data: T) {
    super();
  }
}

export class Success<T, E = string> extends RemoteData<T, E> {
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