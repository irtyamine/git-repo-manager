import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RepositoryDetailsComponent } from './template/repository-details.component';

export const repositoryDetailsRoutes: Routes = [
  {
    path: 'repositories/:repository',
    component: RepositoryDetailsComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(repositoryDetailsRoutes) ],
  exports: [ RouterModule ]
})

export class RepositoryDetailsRoutingModule {  }
