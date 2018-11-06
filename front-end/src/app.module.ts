import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppService } from './services/app.service';

import { routes } from './app.routing';
import { AppComponent } from './app/app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { NotFoundComponent } from './not.found/not.found.component';
import { SortDataService } from './services/sort.data.service';

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
    AppService,
    SortDataService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {  }
