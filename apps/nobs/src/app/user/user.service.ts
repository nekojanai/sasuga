import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  userRoute = environment.API_BASE_URL+'streams/u/';

  constructor(
    private http: HttpClient
  ) {}

  getUser(name: string) {
    return this.http.get(`${this.userRoute}${name}`);
  }
}