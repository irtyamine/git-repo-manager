import { NgModule } from '@angular/core';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ NotificationComponent ],
  imports: [ CommonModule ],
  exports: [ NotificationComponent ],
  providers: [ NotificationService ]
})

export class NotificationModule {  }
