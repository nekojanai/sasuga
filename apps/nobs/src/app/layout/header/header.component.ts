import { Component, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { map } from 'rxjs/operators';
import { Success, Failure, Loading } from '@sasuga/remotedata';
import { IInstanceConfig } from '@sasuga/api-interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'sasuga-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  instanceName$: Observable<string>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.instanceName$ = this.store.select(s => s.instanceConfigState).pipe(
      map(v => {
        if (v instanceof Success || v instanceof Loading) {
          return (v.data as IInstanceConfig)?.instanceName;
        } else if (v instanceof Failure) {
          return '._.';
        }
      }),
    );
  }

}
