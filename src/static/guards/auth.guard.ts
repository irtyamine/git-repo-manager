import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService) { }

  canActivate(): any {
    return this.auth.checkAuthTokenExists().pipe(
      map(res => {
        if(!res) {
          return false;
        } else {
          return true;
        }
      }, err => {
        if (err.indexOf('Unauthorized', 0) >= 0) {
          return false;
        }
      }),
      first()
    );
  }

}