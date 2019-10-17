import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../modules/user-authorization/services/auth.service';
import { NotificationService } from '../notifications/notification.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly notification: NotificationService
  ) {  }

  canActivate() {
    return this.auth.check()
      .pipe(
        map(res => {
          if (!res) {
            this.notification.clear();
            this.notification.error('You should be an authorized to get this page');
            this.router.navigateByUrl('login');
            return false;
          }
          else {
            return true;
          }
        })
      );
  }

}
