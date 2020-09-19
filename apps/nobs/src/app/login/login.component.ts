import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  btnSnd = new Audio('./assets/btn_snd_v3.wav');

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log( this.loginForm.value );
    this.btnSnd.play();
  }

}
