import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginDto, ILoginResponseDto } from '@sasuga/api-interfaces';
import { API_BASE_URL } from '../config';

@Injectable()
export class LoginService {

  private loginBaseRoute = API_BASE_URL+'auth/login';

  constructor(
    private http: HttpClient
  ) {}

  login(credentials: ILoginDto): Observable<ILoginResponseDto> {
    return this.http.post<ILoginResponseDto>(this.loginBaseRoute, credentials);
  }

}