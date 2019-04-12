import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component/app.component';
import { TooltipModule } from 'ngx-bootstrap';
import { GithubAuthComponent } from './github.auth/github.auth';
import { AuthService } from './services/auth.service';
import { Page } from './page/page';
import { AuthGuard } from './guards/auth.guard';
import { DataService } from './services/data.service';
import { GetRepositoriesService } from './services/get.repositories.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: GithubAuthComponent },
  { path: 'table-repositories', component: Page, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    Page,
    GithubAuthComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    TooltipModule.forRoot()
  ],
  providers: [
    AuthService,
    DataService,
    GetRepositoriesService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class FrontendModule {  }
