import { Routes } from '@angular/router';

import { MainpageComponent } from './mainpage/mainpage.component';
import { NotFoundComponent } from './not.found/not.found.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main-page'
  },
  {
    path: 'main-page',
    component: MainpageComponent,
    children: []
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
