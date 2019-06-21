import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component/app.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { GithubAuthComponent } from './auth.component/auth';
import { AuthService } from './services/auth.service';
import { ReposData } from './repos-data.component/repos-data';
import { AuthGuard } from './guards/auth.guard';
import { DataService } from './services/data.service';
import { GetRepositoriesService } from './services/get.repositories.service';
import { BsDropdownModule, CollapseModule, ModalModule, TypeaheadModule } from 'ngx-bootstrap';
import { GetPackagesService } from './services/get.packages.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: GithubAuthComponent },
  { path: 'table-repositories', component: ReposData, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    ReposData,
    GithubAuthComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  providers: [
    AuthService,
    DataService,
    GetRepositoriesService,
    GetPackagesService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class FrontEndModule {  }
