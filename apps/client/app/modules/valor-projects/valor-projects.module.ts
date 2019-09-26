import { NgModule } from '@angular/core';
import { ValorProjectsRoutingModule } from './valor-projects.routing.module';

import { ValorProjectsComponent } from './template/valor-projects.component';
import { CommonModule } from '@angular/common';
import { TimestampPipe } from './template/pipes/timestamp.pipe';

// services
import { HelpersService } from './services/helpers.service';
import { RepositoriesDataService } from './services/repositories-data.service';
import { TooltipModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ ValorProjectsComponent, TimestampPipe ],
  providers: [ HelpersService, RepositoriesDataService ],
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    HttpClientModule,
    ValorProjectsRoutingModule
  ],
  exports: []
})

export class ValorProjectsModule {  }
