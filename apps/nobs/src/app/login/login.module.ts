import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { BtnModule } from './../commons/btn/btn.module';
import { TextinputModule } from './../commons/textinput/textinput.module';
import { LoginService } from './login.service';
import { RemotedataModule } from '@sasuga/remotedata';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BtnModule,
    TextinputModule,
    RemotedataModule
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
