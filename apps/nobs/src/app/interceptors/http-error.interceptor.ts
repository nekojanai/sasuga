import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { TokenActions } from '../state/token';
import { Success } from '@sasuga/remotedata';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<AppState>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(error => {
        if (error.error.statusCode === 401) {
          let ress;
          this.store.select(s => s.tokenState instanceof Success).subscribe(res => ress = res);
          if (ress) {this.store.dispatch(TokenActions.logout())}
        }
        return throwError(error);
      })
    );
  }

}