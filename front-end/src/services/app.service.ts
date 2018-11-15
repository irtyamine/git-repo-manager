import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import url from '../config/url.config';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {  }

  getData(): Observable<any> {
    return this.http.get(`${url.ngrok}/repos/get-repository`)
      .pipe(
        catchError(err => err.code === 404
          ? throwError('Not found')
          : throwError(err)
        )
      );
  }
}


