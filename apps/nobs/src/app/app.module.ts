import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { httpInterceptorProviders } from './interceptors';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './routing/app-routing.module';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers, initialAppState, appEffects } from './state/app.state';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { EffectsModule } from '@ngrx/effects';

import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { RemotedataModule } from '@sasuga/remotedata';
import { SnackbarModule } from './snackbar/snackbar.module';
import { InstanceConfigService } from './state/instance-config/instance-config.service';
import { ProfileService } from './state/profile/profile.service';
import { SettingsModule } from './settings/settings.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { FilesModule } from './files/files.module';

import { GeneralSocket } from './sockets/general.socket';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RemotedataModule,
    StoreModule.forRoot( appReducers, { 
      initialState: initialAppState,
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
        strictStateSerializability: false,
        strictActionSerializability: false,
      }
    }),
    EffectsModule.forRoot( appEffects ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: true
    }),
    LayoutModule,
    HomeModule,
    LoginModule,
    RegisterModule,
    SnackbarModule,
    SettingsModule,
    UserModule,
    FilesModule
  ],
  providers: [
    httpInterceptorProviders,
    InstanceConfigService,
    ProfileService,
    GeneralSocket
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
