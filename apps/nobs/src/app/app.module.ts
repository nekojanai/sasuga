import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers, initialAppState, appEffects } from './state/app.state';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { EffectsModule } from '@ngrx/effects';

import { LoginModule } from './login/login.module'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot( appReducers, { initialState: initialAppState }),
    EffectsModule.forRoot( appEffects ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: true
    }),
    LayoutModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
