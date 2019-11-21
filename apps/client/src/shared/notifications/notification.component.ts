import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Notification, NotificationType } from './notification.model';
import { Subscription } from 'rxjs';
import { NotificationService } from './notification.service';

@Component({
  selector: 'notifications',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})

export class NotificationComponent implements OnInit, OnDestroy {
  @Input() id: string;

  public notifications: Notification[] = [];
  public subscription: Subscription;

  constructor(private readonly notificationService: NotificationService) {  }

  ngOnInit(): void {
    this.subscription = this.notificationService.onNotification(this.id)
      .subscribe(notification => {
        if (!notification.message) {
          this.notifications = [];
          return;
        }

        this.notifications.push(notification);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public cssClass(notification: Notification) {
    if (!notification) {
      return;
    }

    switch (notification.type) {
      case NotificationType.Error:
        return 'notification notification-error';
      case NotificationType.Success:
        return 'notification notification-success';
      case NotificationType.Info:
        return 'notification notification-info';
      case NotificationType.Warning:
        return 'notification notification-warning';
    }

  }

}
