import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsService } from './settings.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BtnModule } from '../commons/btn/btn.module';
import { TextinputModule } from '../commons/textinput/textinput.module';
import { RemotedataModule } from '@sasuga/remotedata';
import { AdminModule } from '../admin/admin.module';
import { FilesModule } from '../files/files.module';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BtnModule,
    TextinputModule,
    RemotedataModule,
    AdminModule,
    FilesModule
  ],
  providers: [
    SettingsService
  ]
})
export class SettingsModule { }
