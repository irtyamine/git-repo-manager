import { Routes } from '@angular/router';

import { MainpageComponent } from './mainpage/mainpage.component';
import { NotFoundComponent } from './not.found/not.found.component';
import { RepoInfoComponent } from './mainpage/repo.info/repo.info.component';

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
    path: 'main-page/:name',
    component: RepoInfoComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
