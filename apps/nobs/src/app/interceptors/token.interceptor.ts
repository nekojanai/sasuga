import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<AppState>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string;
    this.store.select(s => s.tokenState.data).subscribe(ttoken => token = ttoken);
    const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}`}});
    return next.handle(token ? authReq : req);
  }

}