import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { RepositoriesService } from './services/repositories.service';

import { routes } from './app.routing';
import { AppComponent } from './app/app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { NotFoundComponent } from './not.found/not.found.component';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    RepositoriesService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {  }
