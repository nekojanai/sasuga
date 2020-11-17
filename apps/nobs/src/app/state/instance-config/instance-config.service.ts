import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IInstanceConfig } from '@sasuga/api-interfaces';
import { environment } from '../../../environments/environment';


@Injectable()
export class InstanceConfigService {
  private instanceConfigBaseRoute = environment.API_BASE_URL+'config';

  constructor(
    private http: HttpClient
  ) {}

  get() {
    return this.http.get<IInstanceConfig>(this.instanceConfigBaseRoute);
  }
}