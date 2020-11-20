import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IUser } from '@sasuga/api-interfaces';
import { Failure, Initial, Loading, Success } from '@sasuga/remotedata';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppState } from '../state/app.state';
import { ProfileActions } from '../state/profile';
import { SettingsService } from './settings.service';

@Component({
  selector: 'sasuga-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  isAdmin;

  streamkeyIsHidden = true;

  userForm = new FormGroup({
    preferedName: new FormControl('', [Validators.required]),
    summary: new FormControl('', [Validators.required])
  });

  passwordForm = new FormGroup({
    password: new FormControl('', [Validators.required])
  });

  userFormResult = new Initial<string, any>();
  passwordFormResult = new Initial<string, any>();
  resetStreamkeyResult = new Initial<string, any>();

  profile = this.store.select(s => s.profileState.data);

  constructor(
    private settingsService: SettingsService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.store.select(s => s.profileState?.data?.isAdmin);
  }

  selectIconId(event) {
    console.log(event);
  }

  selectImageId(event) {
    console.log(event)
  }

  showStreamkey() {
    this.streamkeyIsHidden = !this.streamkeyIsHidden;
  }

  onUserFormSubmit() {
    this.userFormResult = new Loading(undefined);
    this.settingsService.updateUser(this.userForm.value).pipe(
      catchError(error => {
        this.userFormResult = new Failure(undefined, error.error);
        return of(undefined);
      }),
      tap(data => {
        if (data) {
          this.userFormResult = new Success(data);
          this.store.dispatch(ProfileActions.loadProfileSuccess({profile:data}));
        }
      })
    ).subscribe();
  }

  onPasswordFormSubmit() {
    this.passwordFormResult = new Loading(undefined);
    this.settingsService.updatePassword(this.passwordForm.value).pipe(
      catchError(error => {
        this.passwordFormResult = new Failure(undefined, error.error);
        return of(undefined);
      }),
      tap(data => {
        if (data) {
          this.passwordFormResult = new Success(data);
        }
      })
    ).subscribe();
  }

  resetStreamkey() {
    this.resetStreamkeyResult = new Loading(undefined);
    this.settingsService.resetStreamkey().pipe(
      catchError(error => {
        this.resetStreamkeyResult = new Failure(undefined, error.error);
        return of(undefined);
      }),
      tap(data => {
        if (data) {
          this.resetStreamkeyResult = new Success(data);
          this.store.dispatch(ProfileActions.loadProfileSuccess({profile:data}));
        }
      })
    ).subscribe();
  }

}
