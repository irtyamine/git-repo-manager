import { NgModule } from '@angular/core';
import { TimestampPipe } from './timestamp.pipe';

@NgModule({
  declarations: [ TimestampPipe ],
  exports: [ TimestampPipe ]
})

export class PipesModule {  }
