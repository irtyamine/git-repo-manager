import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

const url = 'http://localhost:8000';
const url1 = 'http://8b786b85.ngrok.io';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {  }


  getData(): Observable<any> {
    return this.http.get(`${url1}/repos/get-repository`)
      .pipe(
        catchError(err => err.code === 404
          ? throwError('Not found')
          : throwError(err)
        )
      );
  }
}


