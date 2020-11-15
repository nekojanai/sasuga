import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Loading, Success } from '@sasuga/remotedata';
import { AppState } from '../state/app.state';
import { TokenActions } from '../state/token';
import { map } from 'rxjs/operators';
import { IInstanceConfig } from '@sasuga/api-interfaces';

@Component({
  selector: 'sasuga-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });

  loginState$ = undefined;
  registrationsEnabledState$ = undefined;
  
  constructor(
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.loginState$ = this.store.select(state => state.tokenState);
    this.registrationsEnabledState$ = this.store.select(state => state.instanceConfigState).pipe(
      map(v => v instanceof Success ? (v.data as IInstanceConfig).registrationsEnabled : false)
    );
  }

  onSubmit(): void {
    this.store.dispatch(TokenActions.login({ credentials: this.loginForm.value }));
  }

}
