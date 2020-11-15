import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../config';
import { IUpdatePasswordDto } from '@sasuga/api-interfaces';

@Injectable()
export class SettingsService {

  private updatePasswordRoute = API_BASE_URL+'profile/reset-password';
  private resetStreamkeyRoute = API_BASE_URL+'profile/reset-streamkey';

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