import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { InstanceConfigActions } from './state/instance-config';

@Component({
  selector: 'sasuga-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(InstanceConfigActions.loadInstanceConfig());
  }
}
