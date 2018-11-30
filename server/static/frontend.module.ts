import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RepositoriesService } from './services/repositories.service';

import { MainpageComponent } from './mainpage/mainpage.component';

@NgModule({
  declarations: [
    MainpageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    RepositoriesService
  ],
  bootstrap: [
    MainpageComponent
  ]
})

export class FrontendModule {  }
