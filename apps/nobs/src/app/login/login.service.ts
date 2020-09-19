import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginDto } from '@sasuga/api-interfaces';
import { Failure } from '@sasuga/remotedata';
import { Observable, of } from 'rxjs';

@Injectable()
export class LoginService {

  loginBaseRoute = 'localhost:3333/api/v1/login';

  constructor(
    private http: HttpClient
  ) {}

  login(credentials: ILoginDto): Observable<string> {
    throw new Error('Not implemented');
    return of('');
  }

}