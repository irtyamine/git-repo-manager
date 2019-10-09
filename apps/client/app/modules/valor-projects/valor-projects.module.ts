import { NgModule } from '@angular/core';
import { ValorProjectsRoutingModule } from './valor-projects.routing.module';

import { ValorProjectsComponent } from './template/valor-projects.component';
import { CommonModule } from '@angular/common';
import { TimestampPipe } from './template/pipes/timestamp.pipe';
import { FiltersChildComponent } from './dynamic-components/filters/child-component/filters-child.component';
import { FiltersParentComponent } from './dynamic-components/filters/parent-component/filters-parent.component';

// services
import { HelpersService } from './services/helpers.service';
import { RepositoriesDataService } from './services/repositories-data.service';
import { TooltipModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FiltrationService } from './services/filtration.service';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    ValorProjectsComponent,
    TimestampPipe,
    FiltersChildComponent,
    FiltersParentComponent
  ],
  entryComponents: [
    FiltersChildComponent
  ],
  providers: [
    HelpersService,
    DataService,
    RepositoriesDataService,
    FiltrationService
  ],
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    HttpClientModule,
    ValorProjectsRoutingModule
  ],
  exports: []
})

export class ValorProjectsModule {  }
