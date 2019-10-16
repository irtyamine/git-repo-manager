import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: './modules/user-authorization/user-authorization.module#UserAuthorizationModule'
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: './modules/company-projects/company-projects.module#CompanyProjectsModule'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {  }
