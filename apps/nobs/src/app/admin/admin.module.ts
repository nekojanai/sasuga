import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminService } from './admin.service';
import { BtnModule } from '../commons/btn/btn.module';
import { TextinputModule } from '../commons/textinput/textinput.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RemotedataModule } from '@sasuga/remotedata';



@NgModule({
  declarations: [
    AdminComponent
  ],
  exports: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BtnModule,
    TextinputModule,
    RemotedataModule
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
