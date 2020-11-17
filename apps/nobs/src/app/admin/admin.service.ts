import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { IUpdateInstanceConfigDto, IUpdatePasswordDto } from '@sasuga/api-interfaces';
import { environment } from '../../environments/environment';

@Injectable()
export class AdminService {

  private instanceConfigBaseRoute = environment.API_BASE_URL+'config';

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