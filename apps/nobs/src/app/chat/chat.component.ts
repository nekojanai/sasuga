import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

  ngUnsubscribe = new Subject();

  messages = [];

  ready = false;

  guestName: string;

  token: string;

  get chatarea() {
    return document.getElementById('chatarea');
  }

  messageForm = new FormGroup({
    message: new FormControl('',[Validators.required])
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
      this.chatSocket.emit('sendMessage', { room: this.channelname, message: this.messageForm.value.message});
    } else {
      this.guestName = this.messageForm.value.message;
      this.chatSocket.emit('joinRoomAsGuest', { room: this.channelname, name: this.guestName});
    }
    this.messageForm.reset({ message: ''});
  }

  ngOnInit(): void {
    this.chatSocket.on('ready',() => {this.ready = true});
    this.store.select(s => s.tokenState.data).subscribe(token => {
      if (token) {
        this.token = token;
        this.chatSocket.emit('joinRoomWithToken', {room: this.channelname, token });
      }
    });
    this.chatSocket.fromEvent('message').pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((msg: any) => {
      this.addMessage(msg);
      setTimeout(this.scroll, 1);
    });
    this.chatSocket.fromEvent('disconnect').pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((msg: any) => {
      if (this.ready) {
        this.ready = false;
      }
    });
    this.chatSocket.fromEvent('reconnect').pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((msg: any) => {
      if (this.token) {
        this.chatSocket.emit('joinRoomWithToken', {room: this.channelname, token: this.token });
      } else if (this.guestName) {
        this.chatSocket.emit('joinRoomAsGuest', { room: this.channelname, name: this.guestName});
      }
    });
  }

  scroll() {
    this.chatarea.scrollTop = this.chatarea.scrollHeight;
  }

  ngOnDestroy(): void {
    this.chatSocket.emit('leaveRoom', {room: this.channelname});
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
