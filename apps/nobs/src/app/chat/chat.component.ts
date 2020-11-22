import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { from, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChatSocket } from '../sockets/chat.socket';
import { AppState } from '../state/app.state';

@Component({
  selector: 'sasuga-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @Input() channelname = 'default';

  @Input() guestsAllowed = true;

  @Output() roomCount = new EventEmitter<number>();

  ngUnsubscribe = new Subject();

  messages = [];

  ready = false;

  guestname: string;

  token: string;

  get chatarea() {
    return document.getElementById('chatarea');
  }

  messageForm = new FormGroup({
    message: new FormControl('',[
      Validators.required,
      Validators.maxLength(128)
    ])
  });

  constructor(
    private chatSocket: ChatSocket,
    private store: Store<AppState>
  ) { }

  addMessage(message) {
    this.messages.push(message);
  }

  messageFormSubmit() {
    if (this.ready) {
      this.chatSocket.emit('sendMessageToRoom', { room: this.channelname, message: this.messageForm.value.message.substring(0,128)});
    } else {
      this.guestname = this.messageForm.value.message;
      this.chatSocket.emit('requestWriteAsGuestInRoom', { username: this.guestname, room: this.channelname });
    }
    this.messageForm.reset({ message: ''});
  }

  ngOnInit(): void {
    this.chatSocket.emit('requestReadInRoom', { room: this.channelname });
    this.store.select(s => s.tokenState.data).subscribe(token => this.token = token);
    this.chatSocket.fromEvent('message').pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((msg: any) => {
      this.addMessage(msg);
      setTimeout(this.scroll, 1);
    });
    this.chatSocket.fromEvent('reconnect').pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((msg: any) => {
      this.chatSocket.emit('requestReadInRoom', { room: this.channelname });
      if(this.token) {
        this.chatSocket.emit('requestWriteAsUserInRoom', { token: this.token, room: this.channelname });
      } else {
        this.chatSocket.emit('requestWriteAsGuestInRoom', { username: this.guestname, room: this.channelname });
      }
    });
    this.chatSocket.fromEvent('ready').pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(_ => this.ready = true);
    this.chatSocket.fromEvent('roomCount').pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((count: number) => this.roomCount.emit(count));
    if (this.token) {
      this.chatSocket.emit('requestWriteAsUserInRoom', { token: this.token, room: this.channelname });
    }
    this.chatSocket.emit('requestEmitRoomCount', { room: this.channelname });
  }

  scroll() {
    this.chatarea.scrollTop = this.chatarea.scrollHeight;
  }

  ngOnDestroy(): void {
    this.chatSocket.emit('requestLeaveRoom', { room: this.channelname });
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
