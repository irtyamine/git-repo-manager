import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, timeout, retry } from 'rxjs/operators';
import { Observable, pipe, throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class AuthService {
  public API_URL = environment.url;
  constructor(private http: HttpClient) {  }

  public gitLogin() {
      window.location.href = `${this.API_URL}/repositories2/github`;
  }

  public checkAuthTokenExists(): Observable<any> {
    return this.http.get(`${this.API_URL}/repositories2/isAuthenticated`)
      .pipe(
        timeout(30000),
        catchError(err =>
          err.name === 'TimeoutError' ? throwError('Auth check timed out')
            : err.code === 404 ? throwError('Not Found')
            : err.code === 401 ? throwError('Unauthorized')
            : throwError(err.message))
      );
  }
}
