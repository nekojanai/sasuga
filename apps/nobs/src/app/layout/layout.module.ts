import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SeperatorComponent } from './seperator/seperator.component';
import { RouterModule } from '@angular/router';
import { OverlayComponent } from './overlay/overlay.component';
import { BtnModule } from '../commons/btn/btn.module';



@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,
    SeperatorComponent,
    OverlayComponent
  ],
  exports: [
    HeaderComponent,
    MainComponent,
    SeperatorComponent,
    OverlayComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BtnModule
  ]
})
export class LayoutModule { }
