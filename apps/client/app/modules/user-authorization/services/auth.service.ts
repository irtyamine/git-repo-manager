import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthService {

  constructor(private readonly http: HttpClient) {  }

  public authenticateUser(authData) {
    return this.http.post(`${environment.url}/api/${authData.dataSource}/organization-check`, authData)
      .pipe( catchError(err =>
        err.code === 404 ? throwError('no found')
          : throwError(err.message)));
  }

}
