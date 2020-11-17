import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUpdatePasswordDto } from '@sasuga/api-interfaces';
import { environment } from '../../environments/environment';

@Injectable()
export class SettingsService {

  private updatePasswordRoute = environment.API_BASE_URL+'profile/reset-password';
  private resetStreamkeyRoute = environment.API_BASE_URL+'profile/reset-streamkey';

  constructor(
    private http: HttpClient,
  ) {}

  updatePassword(data: IUpdatePasswordDto) {
    return this.http.patch(this.updatePasswordRoute, data);
  }

  resetStreamkey() {
    return this.http.post(this.resetStreamkeyRoute, {});
  }
}