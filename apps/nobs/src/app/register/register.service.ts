import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRegisterDto, IRegisterResponseDto } from '@sasuga/api-interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private registerBaseRoute = environment.API_BASE_URL+'auth/register';

  constructor(
    private http: HttpClient,

  ) { }

  register(credentials: IRegisterDto): Observable<IRegisterResponseDto> {
    return this.http.post<IRegisterResponseDto>(this.registerBaseRoute, credentials );
  }
}
