import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AuthService {
  private cookieFileName = '_auth_token';
  public API_URL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {  }

  public logIn(data: { login: string, password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/repositories1/new-data`, data)
      .pipe(
        map((res: any) => {
          if (res) {
            this.cookieService.set(this.cookieFileName, res.authToken);
            return true;
          }
          return false;
        }),
        catchError(err =>
          err.code === 404 ? throwError('Not Found') :
            err.code === 401 ? throwError('Unauthorized') : throwError(err.message))
      );
  }

  public logOut() {
    this.cookieService.delete(this.cookieFileName);
    this.router.navigate(['/']);
  }

  public githubAuthentication(): Observable<any> {
    return this.http.get(`${this.API_URL}/repositories1/get-user-data`)
      .pipe(
        catchError(err =>
          err.code === 404 ? throwError('Not Found') : throwError(err.message))
    );
  }
}