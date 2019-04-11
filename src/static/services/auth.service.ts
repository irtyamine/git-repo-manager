import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AuthService {
  public API_URL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
  constructor(private http: HttpClient) {  }

  public gitLogin() {
    window.location.href = `${this.API_URL}/repositories2/github`;
  }

  public checkAuthTokenExists(): Observable<any> {
    return this.http.get(`${this.API_URL}/repositories2/isAuthenticated`)
      .pipe(
        catchError(err =>
          err.code === 404 ? throwError('Not Found')
            : err.code === 401 ? throwError('Unauthorized')
            : throwError(err.message))
      );
  }
}
