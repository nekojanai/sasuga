import { Component, OnInit } from '@angular/core';
import { SnackbarService } from './snackbar.service';

@Component({
  selector: 'sasuga-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  messages;

  constructor(
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.messages = this.snackbarService.messages;
  }

}
