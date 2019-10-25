import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComapnyProjectsComponent } from './template/company-projects.component';

export const valorProjectsRoute: Routes = [
  {
    path: 'repositories',
    component: ComapnyProjectsComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(valorProjectsRoute) ],
  exports: [ RouterModule ]
})

export class ComapnyProjectsRoutingModule {  }
