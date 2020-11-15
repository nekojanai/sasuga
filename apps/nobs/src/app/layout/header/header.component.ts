import { Component, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { map } from 'rxjs/operators';
import { Success, Failure, Loading } from '@sasuga/remotedata';
import { IInstanceConfig } from '@sasuga/api-interfaces';
import { Observable } from 'rxjs';
import { TokenActions } from '../../state/token';

@Component({
  selector: 'sasuga-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuHidden = true;

  instanceName$ = this.store.select(s => s.instanceConfigState?.data?.instanceName);

  isLoggedIn$ = this.store.select(s => s.tokenState).pipe(
    map(v => v instanceof Success)
  );

  username$ = this.store.select(s => s.profileState).pipe(
    map(v => v.data?.name)
  );

  constructor(
    private store: Store<AppState>
  ) { }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
    if(!this.menuHidden) {setTimeout(() => window.addEventListener('click', () => this.toggleMenu(), {once:true}),1)};
  }

  ngOnInit(): void {
    
  }

  logout() {
    this.store.dispatch(TokenActions.logout());
  }

}
