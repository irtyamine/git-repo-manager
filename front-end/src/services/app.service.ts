import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

const url = 'http://localhost:8000';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {  }


  getData(): Observable<any> {
    return this.http.get(`${url}/repos/get-repository`)
      .pipe(
        catchError(err => err.code === 404
          ? throwError('Not found')
          : throwError(err)
        )
      );
  }

  getRepoData(): Observable<any> {
    return this.http.get(`${url}/repos/get-repo-data`)
      .pipe(
        catchError(err => err.code === 404
          ? throwError('Not found')
          : throwError(err)
        )
      );
  }
}


