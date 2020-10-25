import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterService } from './register.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BtnModule } from '../commons/btn/btn.module';
import { TextinputModule } from '../commons/textinput/textinput.module';



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BtnModule,
    TextinputModule
  ],
  providers: [
    RegisterService
  ]
})
export class RegisterModule { }
