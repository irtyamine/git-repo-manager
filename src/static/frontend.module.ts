import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GetRepositoriesService } from './services/get.repositories.service';
import { TooltipModule } from 'ngx-bootstrap';
import { Page } from './page/page';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    Page
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    TooltipModule.forRoot()
  ],
  providers: [
    DataService,
    GetRepositoriesService
  ],
  bootstrap: [
    Page
  ]
})

export class FrontendModule {  }
