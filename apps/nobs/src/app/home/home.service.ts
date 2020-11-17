import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class HomeService {

  streamsRoute = environment.API_BASE_URL+'streams';

  constructor(
    private http: HttpClient
  ) {}

  get(options) {
    return this.http.get(this.streamsRoute, { params: new HttpParams({ fromObject: options }) });
  }

}