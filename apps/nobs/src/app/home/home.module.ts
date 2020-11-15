import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemotedataModule } from '@sasuga/remotedata';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RemotedataModule,
    RouterModule
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule { }
