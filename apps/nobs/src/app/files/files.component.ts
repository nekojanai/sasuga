import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AppState } from '../state/app.state';
import { FilesService } from './files.service';

@Component({
  selector: 'sasuga-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  @Input() fileSelecting = false;

  selectedFileId = '';

  @Output() selectedFileIdChange = new EventEmitter<string>();

  uploadBasePath: string;

  uploadStatus: string;

  uploads;

  constructor(
    private filesService: FilesService,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.store.select(s => s.profileState.data?.name).subscribe(name => {
      this.uploadBasePath = `${environment.S3_BASE_URL}/${name}/`;
    });
    this.route.queryParams.subscribe(params => {
      this.getUploads(params.page, params.limit)
    });
  }

  selectFile(fileId: string) {
    if (this.fileSelecting) {
      this.selectedFileId = fileId;
      this.selectedFileIdChange.emit(fileId);
    }
  }

  deleteUpload(filename: string) {
    this.filesService.deleteUpload(filename).subscribe(_ => this.getUploads());
  }

  getUploads(page: number = 1, limit: number = 10) {
    this.filesService.getUploads(page, limit).subscribe((data: any) => {
      this.uploads = data
    });
  }

  filesChange(files) {
    this.filesService.upload(files).pipe(
      map(event => this.handleUploadEvents(event)),
      tap(message => this.uploadStatus = message),
      finalize(() => { this.getUploads() })
    ).subscribe();
  }

  handleUploadEvents(event: HttpEvent<any>) {
    switch(event.type) {
      case HttpEventType.Sent:
        return 'Uploading file started!';
      case HttpEventType.UploadProgress:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return `Upload is ${percentDone}% done.`;
      case HttpEventType.Response:
        return 'Upload complete!';
      default:
        return 'uwu';
    }
  }

}
