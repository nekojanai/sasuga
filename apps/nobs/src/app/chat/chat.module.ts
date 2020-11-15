import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatSocket } from '../sockets/chat.socket';
import { ChatComponent } from './chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BtnModule } from '../commons/btn/btn.module';
import { TextinputModule } from '../commons/textinput/textinput.module';



@NgModule({
  declarations: [ChatComponent],
  exports: [ChatComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BtnModule,
    TextinputModule
  ],
  providers: [
    ChatSocket
  ]
})
export class ChatModule { }
