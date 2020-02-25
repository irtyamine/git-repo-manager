import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponnent } from './app.componnent';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponnent ],
  bootstrap: [ AppComponnent ]
})

export class AppModule {  }
