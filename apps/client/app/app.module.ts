import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { AppRoutingModule } from './app.routing.module';
import { NotificationModule } from './shared/notifications/notification.module';
import { AuthService } from './modules/user-authorization/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NotificationModule,
    HttpClientModule,
  ],
  providers: [ AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
