import { NgModule } from '@angular/core';
import { RepositoryDetailsComponent } from './template/repository-details.component';

import { RepositoryDetailsService } from './services/repository-details.service';

import { RepositoryDetailsRoutingModule } from './repository-details.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DependenciesService } from './services/dependencies.service';
import { HeaderModule } from '../../../shared/header/header.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { ModalModule, TypeaheadModule } from 'ngx-bootstrap';
import { RepositoryBranchesService } from './services/repository-branches.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RepositoryDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RepositoryDetailsRoutingModule,
    HttpClientModule,
    HeaderModule,
    PipesModule,
    ModalModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  providers: [
    RepositoryDetailsService,
    DependenciesService,
    RepositoryBranchesService
  ]
})

export class RepositoryDetailsModule {  }
