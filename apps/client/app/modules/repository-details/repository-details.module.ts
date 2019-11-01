import { NgModule } from '@angular/core';
import { RepositoryDetailsComponent } from './template/repository-details.component';

import { RepositoryDetailsService } from './services/repository-details.service';

import { RepositoryDetailsRoutingModule } from './repository-details.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DependenciesService } from './services/dependencies.service';
import { HeaderModule } from '../../shared/header/header.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { ModalModule } from 'ngx-bootstrap';
import { RepositoryBranchesService } from './services/repository-branches.service';

@NgModule({
  declarations: [
    RepositoryDetailsComponent
  ],
  imports: [
    CommonModule,
    RepositoryDetailsRoutingModule,
    HttpClientModule,
    HeaderModule,
    PipesModule,
    ModalModule.forRoot()
  ],
  providers: [
    RepositoryDetailsService,
    DependenciesService,
    RepositoryBranchesService
  ]
})

export class RepositoryDetailsModule {  }
