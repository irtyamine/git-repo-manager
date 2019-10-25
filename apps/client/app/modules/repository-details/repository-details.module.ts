import { NgModule } from '@angular/core';
import { RepositoryDetailsComponent } from './template/repository-details.component';

import { RepositoryDetailsService } from './services/repository-details.service';

import { RepositoryDetailsRoutingModule } from './repository-details.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DependenciesService } from './services/dependencies.service';
import { HeaderModule } from '../header/header.module';
import { PipesModule } from '../../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    RepositoryDetailsComponent
  ],
  imports: [
    CommonModule,
    RepositoryDetailsRoutingModule,
    HttpClientModule,
    HeaderModule,
    PipesModule
  ],
  providers: [
    RepositoryDetailsService,
    DependenciesService
  ]
})

export class RepositoryDetailsModule {  }
