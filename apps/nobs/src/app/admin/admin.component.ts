import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Failure, Initial, Loading, Success } from '@sasuga/remotedata';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppState } from '../state/app.state';
import { InstanceConfigActions } from '../state/instance-config';
import { AdminService } from './admin.service';

@Component({
  selector: 'sasuga-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  instanceConfigFormResult = new Initial();

  instanceConfigForm = new FormGroup({
    registrationsEnabled: new FormControl(true,[Validators.required]),
    instanceName: new FormControl('',[Validators.required])
  })

  constructor(
    private adminService: AdminService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.adminService.getInstanceConfig().subscribe((res:any) => {
      this.instanceConfigForm.reset(res);
    });
  }

  onInstanceConfigFormSubmit() {
    this.instanceConfigFormResult = new Loading(undefined);
    this.adminService.updateInstanceConfig(this.instanceConfigForm.value).pipe(
      catchError(error => {
        this.instanceConfigFormResult = new Failure(undefined, error.error);
        return of(undefined);
      }),
      tap(data => {
        if (data) {
          this.instanceConfigFormResult = new Success(data);
          this.store.dispatch(InstanceConfigActions.loadInstanceConfig());
        }
      })
    ).subscribe();
  }

}
