import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { UserAuthorizationComponent } from './template/user-authorization.component';
import { UserAuthorizationRoutingModule } from './user-authorization.routing.module';

@NgModule({
  declarations: [ UserAuthorizationComponent ],
  imports: [
    UserAuthorizationRoutingModule,
    ReactiveFormsModule
  ],
  providers: []
})

export class UserAuthorizationModule {  }
