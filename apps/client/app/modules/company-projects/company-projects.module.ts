import { NgModule } from '@angular/core';
import { ComapnyProjectsRoutingModule } from './comapny-projects.routing.module';

import { ComapnyProjectsComponent } from './template/company-projects.component';
import { CommonModule } from '@angular/common';
import { TimestampPipe } from './pipes/timestamp.pipe';
import { FiltersChildComponent } from './dynamic-components/filters/child-component/filters-child.component';
import { FiltersParentComponent } from './dynamic-components/filters/parent-component/filters-parent.component';

// services
import { HelpersService } from './services/helpers.service';
import { RepositoriesDataService } from './services/repositories-data.service';
import { TooltipModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FiltrationService } from './services/filtration.service';
import { DataService } from './services/data.service';
import { AuthService } from '../user-authorization/services/auth.service';
import { HeaderModule } from '../header/header.module';

@NgModule({
  declarations: [
    ComapnyProjectsComponent,
    TimestampPipe,
    FiltersChildComponent,
    FiltersParentComponent
  ],
  entryComponents: [
    FiltersChildComponent
  ],
  providers: [
    AuthService,
    HelpersService,
    DataService,
    RepositoriesDataService,
    FiltrationService
  ],
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    HttpClientModule,
    ComapnyProjectsRoutingModule,
    HeaderModule
  ],
  exports: []
})

export class CompanyProjectsModule {  }
