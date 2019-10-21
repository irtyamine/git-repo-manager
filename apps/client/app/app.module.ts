import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { AppRoutingModule } from './app.routing.module';
import { NotificationModule } from './shared/notifications/notification.module';
import { AuthService } from './modules/user-authorization/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

import { AuthReducer } from './shared/store/reducers/auth.reducer';
import { StoreModule } from '@ngrx/store';
import { StoreService } from './shared/services/store.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NotificationModule,
    HttpClientModule,
    StoreModule.forRoot({ 'auth': AuthReducer })
  ],
  providers: [ AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
