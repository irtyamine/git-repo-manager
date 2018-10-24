import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppService } from './services/app.service';

import { routes } from './app.routing';
import { AppComponent } from './app/app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { RepoInfoComponent } from './mainpage/repo.info/repo.info.component';
import { NotFoundComponent } from './not.found/not.found.component';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    RepoInfoComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AppService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {  }
