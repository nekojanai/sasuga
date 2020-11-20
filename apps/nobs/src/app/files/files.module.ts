import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesComponent } from './files.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BtnModule } from '../commons/btn/btn.module';
import { TextinputModule } from '../commons/textinput/textinput.module';
import { FilesService } from './files.service';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    FilesComponent
  ],
  exports: [
    FilesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    BtnModule,
    TextinputModule
  ],
  providers: [
    FilesService
  ]
})
export class FilesModule { }
