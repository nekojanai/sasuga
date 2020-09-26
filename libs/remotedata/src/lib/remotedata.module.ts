import { NgModule } from '@angular/core';
import {
  IsFailurePipe,
  IsInitialPipe,
  IsLoadingPipe,
  IsSuccessPipe
} from './pipes';

const declarations = [
  IsInitialPipe,
  IsLoadingPipe,
  IsSuccessPipe,
  IsFailurePipe
];

@NgModule({
  declarations,
  exports: declarations
})
export class RemotedataModule {}