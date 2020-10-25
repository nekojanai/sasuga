import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRegisterDto, IRegisterResponseDto } from '@sasuga/api-interfaces';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Initial, Failure } from '@sasuga/remotedata';
import { API_BASE_URL } from '../config';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private registerBaseRoute = API_BASE_URL+'auth/register';

  constructor(
    private http: HttpClient,

  ) { }

  register(credentials: IRegisterDto): Observable<IRegisterResponseDto> {
    return this.http.post<IRegisterResponseDto>(this.registerBaseRoute, credentials );
  }
}
