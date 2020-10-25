import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../config';
import { IInstanceConfig } from '@sasuga/api-interface';


@Injectable()
export class InstanceConfigService {
  private instanceConfigBaseRoute = API_BASE_URL+'config';

  constructor(
    private http: HttpClient
  ) {}

  load() {
    return this.http.get<IInstanceConfig>(this.instanceConfigBaseRoute);
  }
}