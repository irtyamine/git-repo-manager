import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ValorProjectsComponent } from './template/valor-projects.component';

export const valorProjectsRoute: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'all-projects'
  },
  {
    path: 'all-projects',
    component: ValorProjectsComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(valorProjectsRoute) ],
  exports: [ RouterModule ]
})

export class ValorProjectsRoutingModule {  }
