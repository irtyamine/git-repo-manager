import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { GetRepositoriesService } from './services/get.repositories.service';

import { Page } from './page/page';

@NgModule({
  declarations: [
    Page,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    GetRepositoriesService
  ],
  bootstrap: [
    Page
  ]
})

export class FrontendModule {  }
