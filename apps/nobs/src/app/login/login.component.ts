import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Loading } from '@sasuga/remotedata';
import { AppState } from '../state/app.state';
import { TokenActions } from '../state/token';

@Component({
  selector: 'sasuga-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });

  loginState$ = undefined;
  
  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loginState$ = this.store.select(state => state.tokenState);
  }

  onSubmit(): void {
    this.store.dispatch(TokenActions.login({ credentials: this.loginForm.value }));
  }

}
