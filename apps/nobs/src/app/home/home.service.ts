import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../config';
import {
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class HomeService {

  streamsRoute = API_BASE_URL+'streams';

  constructor(
    private http: HttpClient
  ) {}

  get(options) {
    return this.http.get(this.streamsRoute, { params: new HttpParams({ fromObject: options }) });
  }

}