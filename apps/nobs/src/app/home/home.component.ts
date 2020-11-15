import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUser } from '@sasuga/api-interfaces';
import { Failure, Initial, Success } from '@sasuga/remotedata';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppState } from '../state/app.state';
import { InstanceConfigActions } from '../state/instance-config';
import { HomeService } from './home.service';
import { Socket } from 'ngx-socket-io';
import { GeneralSocket } from '../sockets/general.socket';

@Component({
  selector: 'sasuga-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  streamsResult = new Initial<any, any>();

  interval = undefined;


  constructor(
    private homeService: HomeService,
    private generalSocket: GeneralSocket
  ) { }

  ngOnInit(): void {
    this.getCurrentlyStreaming();
    this.generalSocket.fromEvent('newStream').pipe(
      tap(_ => this.getCurrentlyStreaming())
    ).subscribe();
    this.generalSocket.fromEvent('endStream').pipe(
      tap(_ => this.getCurrentlyStreaming())
    ).subscribe();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  getCurrentlyStreaming(options?: {page?: number, limit?: number}) {
    this.homeService.get(options).pipe(
      catchError(error => {
        this.streamsResult = new Failure(undefined, error.error);
        return of(undefined);
      }),
      tap(data => {
        if (data) {
          this.streamsResult = new Success(data);
        }
      })
    ).subscribe();
  }

}
