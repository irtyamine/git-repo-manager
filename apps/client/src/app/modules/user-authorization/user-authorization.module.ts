import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { UserAuthorizationRoutingModule } from './user-authorization.routing.module';
import { HttpClientModule } from '@angular/common/http';

import { UserAuthorizationComponent } from './template/user-authorization.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [ UserAuthorizationComponent ],
  imports: [
    HttpClientModule,
    UserAuthorizationRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ AuthService ]
})

export class UserAuthorizationModule {  }
