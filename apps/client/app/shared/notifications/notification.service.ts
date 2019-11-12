import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Notification, NotificationType } from './notification.model';

@Injectable()
export class NotificationService {
  private subject = new Subject<Notification>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof  NavigationStart) {
        if (this.keepAfterRouteChange) {
          this.keepAfterRouteChange = false;
        } else {
          this.clear();
        }
      }
    });
  }

  public onNotification(notificationId?: string): Observable<Notification> {
    return this.subject.asObservable().pipe(filter(x => x && x.notificationId === notificationId));
  }

  public error(message: string, notificationId?: string) {
    this.notification(new Notification({message, type: NotificationType.Error, notificationId}));
  }

  public notification(notification: Notification) {
    this.keepAfterRouteChange = notification.keepAfterRouteChange;
    this.subject.next(notification);
  }

  public clear(notificationId?: string) {
    this.subject.next(new Notification({ notificationId }));
  }

}
