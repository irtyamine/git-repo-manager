import { NgModule } from '@angular/core';
import { ValorProjectsRoutingModule } from './valor-projects.routing.module';

import { ValorProjectsComponent } from './template/valor-projects.component';
import { CommonModule } from '@angular/common';
import { TimestampPipe } from './template/pipes/timestamp.pipe';

// services
import { HelpersService } from './services/helpers.service';
import { TooltipModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [ ValorProjectsComponent, TimestampPipe ],
  providers: [ HelpersService ],
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    ValorProjectsRoutingModule
  ],
  exports: []
})

export class ValorProjectsModule {  }
