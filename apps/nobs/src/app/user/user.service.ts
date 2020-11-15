import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../config';

@Injectable()
export class UserService {

  userRoute = API_BASE_URL+'streams/u/';

  constructor(
    private http: HttpClient
  ) {}

  getUser(name: string) {
    return this.http.get(`${this.userRoute}${name}`);
  }
}