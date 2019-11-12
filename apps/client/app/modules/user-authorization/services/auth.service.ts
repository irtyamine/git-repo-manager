import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../../../shared/notifications/notification.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { StoreService } from '../../../shared/services/store.service';

@Injectable()
export class AuthService implements ErrorHandler {
  private errorText: string;

  constructor(
    private readonly http: HttpClient,
    private readonly notificationService: NotificationService,
    private readonly store: StoreService,
    private readonly lsService: LocalStorageService
  ) {  }

  public authenticateUser(authData) {
    return this.http.post(`${environment.url}/api/${authData.dataSource}/organization-check`, authData)
      .pipe(catchError(this.handleError))
      .subscribe(() => {
        this.notificationService.clear();
        this.lsService.setItem('org', authData.organization);
        this.lsService.setItem('source', authData.dataSource);
        window.location.href = `${environment.url}/api/${authData.dataSource}/login`;
      }, err => {
        this.notificationService.clear();
        this.notificationService.error(err);
      });
  }

  public check(): Observable<any> {
    return this.http.get(`${environment.url}/api/github/isAuthenticated`);
  }

  handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      this.errorText = `${err.error.message}`;
      console.error('An error occurred:', err.error.message);
    } else {
      this.errorText = `${err.error.error}: ${err.error.message}`;
      console.error(
        `Backend returned code ${err.status}, ` +
        `body was: ${err.error}`);
    }

    return throwError(this.errorText);
  }

  public logout() {
    const { dataSource } = this.store.getAuthData();

    this.lsService.clear();
    window.location.href = `${environment.url}/api/${dataSource}/logout`;
  }
}
