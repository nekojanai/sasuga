import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Initial, Failure, Success } from '@sasuga/remotedata';


@Component({
  selector: 'sasuga-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  result = new Initial();

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
      catchError(error => {
        if(error.error instanceof ErrorEvent) {
          console.log('client side error '+error.status);
        } else {
          console.log('server side error '+error.status);
          this.result = new Failure(undefined, error.status);
        }
        return of(undefined);
      }),
      tap(data => {
        if (data) {
          this.result = new Success(data);
        }
      })
    ).subscribe();
  }

}
