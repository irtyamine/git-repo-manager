import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { AppRoutingModule } from './app.routing.module';
import { NotificationModule } from './shared/notifications/notification.module';
import { AuthService } from './modules/user-authorization/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

import { AuthReducer } from './shared/store/reducers/auth.reducer';
import { WarningsReducer } from './shared/store/reducers/warnings.reducer';
import { StoreModule } from '@ngrx/store';
import { DataService } from './shared/services/data.service';
import { RepositoriesDataService } from './shared/services/repositories-data.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NotificationModule,
    HttpClientModule,
    StoreModule.forRoot({
      'auth': AuthReducer,
      'warnings': WarningsReducer
    }),
  ],
  providers: [ AuthService, DataService, RepositoriesDataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
