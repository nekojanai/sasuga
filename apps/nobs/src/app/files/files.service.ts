import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class FilesService {

  private uploadsBaseUrl = environment.API_BASE_URL+'profile/uploads/';

  constructor(
    private http: HttpClient
  ) {}

  upload(files: FileList) {
    const formData = new FormData();
    for (const file of (files as any)) {
      formData.append("files",file);
    }
    return this.http.post(this.uploadsBaseUrl,formData, {reportProgress: true, observe: 'events'});
  }

  getUploads(page: number = 1, limit: number = 10) {
    const params = new HttpParams().set('page', `${page}`).set('limit', `${limit}`);
    return this.http.get(this.uploadsBaseUrl, {params});
  }

  deleteUpload(filename: string) {
    return this.http.delete(this.uploadsBaseUrl+filename);
  }

}