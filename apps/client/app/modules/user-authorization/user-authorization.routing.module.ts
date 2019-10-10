import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserAuthorizationComponent } from './template/user-authorization.component';

export const userAuthorizationRoutes: Routes = [
  {
    path: 'login',
    component: UserAuthorizationComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(userAuthorizationRoutes) ],
  exports: [ RouterModule ]
})

export class UserAuthorizationRoutingModule {  }
