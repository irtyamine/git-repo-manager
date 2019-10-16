import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../app/modules/user-authorization/services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService
  ) {  }

  canActivate() {
    return this.auth.check().pipe(
      map(res => {
        if (!res) {
          this.router.navigateByUrl('/');
          return false;
        }

        this.router.navigateByUrl('/all-projects');
        return true;
      })
    )
  }

}
