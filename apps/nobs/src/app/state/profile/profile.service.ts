import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../config';
import { IUser } from '@sasuga/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileBaseRoute = API_BASE_URL+'profile';

  constructor(
    private http: HttpClient
  ) {}

  getProfile() {
    return this.http.get<IUser>(this.profileBaseRoute);
  }
}