import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'sasuga-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  result = undefined;

  registerForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });

  constructor(
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.registerService.register(this.registerForm.value).pipe(
      catchError(e => { console.log(e.message); return of(e); })
    ).subscribe((data) => {
      this.result = data;
    });
  }

}
