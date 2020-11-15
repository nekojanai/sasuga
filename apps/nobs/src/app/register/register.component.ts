import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Initial, Failure, Success, RemoteData } from '@sasuga/remotedata';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { TokenActions } from '../state/token';
import { IRegisterResponseDto } from '@sasuga/api-interfaces';


@Component({
  selector: 'sasuga-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  result: RemoteData<any, any> = new Initial<any, any>();

  registerForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });

  constructor(
    private registerService: RegisterService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.registerService.register(this.registerForm.value).pipe(
      catchError(error => {
        this.result = new Failure(undefined, error.error);
        return of(undefined);
      }),
      tap(data => {
        if (data) {
          this.result = new Success(data);
          this.store.dispatch(TokenActions.loginSuccess({ token: data.token }))
        }
      })
    ).subscribe();
  }

}
