import { NgModule } from '@angular/core';
import { ComapnyProjectsRoutingModule } from './comapny-projects.routing.module';

import { ComapnyProjectsComponent } from './template/company-projects.component';
import { CommonModule } from '@angular/common';
import { FiltersChildComponent } from './dynamic-components/filters/child-component/filters-child.component';
import { FiltersParentComponent } from './dynamic-components/filters/parent-component/filters-parent.component';

// services
import { HelpersService } from './services/helpers.service';
import { TooltipModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FiltrationService } from './services/filtration.service';
import { AuthService } from '../user-authorization/services/auth.service';
import { HeaderModule } from '../../shared/header/header.module';
import { TimestampPipe } from '../../shared/pipes/timestamp.pipe';
import { PipesModule } from '../../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    ComapnyProjectsComponent,
    FiltersChildComponent,
    FiltersParentComponent
  ],
  entryComponents: [
    FiltersChildComponent
  ],
  providers: [
    AuthService,
    HelpersService,
    FiltrationService
  ],
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    HttpClientModule,
    ComapnyProjectsRoutingModule,
    HeaderModule,
    PipesModule
  ],
  exports: []

})

export class CompanyProjectsModule {  }
