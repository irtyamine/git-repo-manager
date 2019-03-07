import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component/app.component';
import { GetRepositoriesService } from './services/get.repositories.service';
import { TooltipModule } from 'ngx-bootstrap';
import { Page } from './page/page';
import { GithubAuthComponent } from './github.auth/github.auth';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { CookieService} from 'ngx-cookie-service';
import { NotFoundComponent } from './not.found.component/not.found.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: GithubAuthComponent },
  { path: 'table-repositories', component: Page, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    Page,
    GithubAuthComponent,
    NotFoundComponent
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
    DataService,
    AuthService,
    CookieService,
    GetRepositoriesService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class FrontendModule {  }
