import { NgModule } from '@angular/core';
import { RepositoryDetailsComponent } from './template/repository-details.component';

import { RepositoryDetailsService } from './services/repository-details.service';

import { RepositoryDetailsRoutingModule } from './repository-details.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DataService } from '../company-projects/services/data.service';
import { RepositoriesDataService } from '../company-projects/services/repositories-data.service';

@NgModule({
  declarations: [
    RepositoryDetailsComponent
  ],
  imports: [
    CommonModule,
    RepositoryDetailsRoutingModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    RepositoriesDataService,
    RepositoryDetailsService
  ]
})

export class RepositoryDetailsModule {  }
