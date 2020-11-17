import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginDto, ILoginResponseDto } from '@sasuga/api-interfaces';
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {

  private loginBaseRoute = environment.API_BASE_URL+'auth/login';

  constructor(
    private http: HttpClient
  ) {}

  login(credentials: ILoginDto): Observable<ILoginResponseDto> {
    return this.http.post<ILoginResponseDto>(this.loginBaseRoute, credentials);
  }

}