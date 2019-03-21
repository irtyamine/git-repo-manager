import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService, private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.auth.checkAuthTokenExists().pipe(
      map(res => {
        if(!res) {
          return false;
        } else {
          return true;
        }
      }, err => {
        if (err.indexOf('401 Unauthorized', 0) >= 0) {
          return false;
        }
      }),
      first()
    );
  }

}