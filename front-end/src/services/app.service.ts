import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

const url = 'http://localhost:8000';
const url1 = 'http://0254974e.ngrok.io';

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


