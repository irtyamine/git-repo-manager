import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) {  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.cookieService.get('_auth_token')) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}