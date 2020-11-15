import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../config';
import { IUpdateInstanceConfigDto, IUpdatePasswordDto } from '@sasuga/api-interfaces';

@Injectable()
export class AdminService {

  private instanceConfigBaseRoute = API_BASE_URL+'config';

  constructor(
    private http: HttpClient,
  ) {}

  getInstanceConfig() {
    return this.http.get(this.instanceConfigBaseRoute);
  }

  updateInstanceConfig(data: IUpdateInstanceConfigDto) {
    return this.http.patch(this.instanceConfigBaseRoute, data);
  }
}