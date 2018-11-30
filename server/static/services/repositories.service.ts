import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import gitHubConfig from '../../../config/github.repositories';

@Injectable()
export class RepositoriesService {
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http
      .get(`${gitHubConfig.url.localhost}/repositories/repository`)
      .pipe(
        catchError(err =>
          err.code === 404 ? throwError('Not found') : throwError(err),
        ),
      );
  }

  getAllRepositories(): Observable<any> {
    return this.http.get(`${gitHubConfig.url.localhost}/repositories/all-repositories`);
  }
}
