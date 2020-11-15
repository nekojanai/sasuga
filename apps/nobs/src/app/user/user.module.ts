import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { ChatModule } from '../chat/chat.module';



@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    ChatModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
