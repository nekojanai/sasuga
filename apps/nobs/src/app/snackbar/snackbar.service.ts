import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  messages: string[] = [];

  constructor() {}

  addMessage(string) {
    this.messages.push(string);
    setTimeout(() => this.removeMessage(), 3000);
  }

  removeMessage() {
    this.messages.shift();
  }

}