import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '@sasuga/api-interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileBaseRoute = environment.API_BASE_URL+'profile';

  constructor(
    private http: HttpClient
  ) {}

  getProfile() {
    return this.http.get<IUser>(this.profileBaseRoute);
  }
}