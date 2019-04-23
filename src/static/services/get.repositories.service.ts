import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, timeout } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()

export class GetRepositoriesService {

  public API_URL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

  constructor(protected http: HttpClient) {}

  public getRecommendVersionDataConfig(): Observable<any> {
    return this.http.get(`${this.API_URL}/repositories/recommend-versions`)
      .pipe(
        timeout(25000),
        catchError(err =>
          err.name === 'TimeoutError' ? throwError('Get recommend versions timed out') :
            err.code === 404 ? throwError('Not Found') :
            err.code === 401 ? throwError('Unauthorized') : throwError(err))
        );
  }

  public getRepositoryNames(): Observable<any> {
    return this.http
      .get(`${this.API_URL}/repositories/names`)
      .pipe(
        timeout(25000),
        catchError(err =>
         err.name === 'TimeoutError' ? throwError('Get repositories names timed out') :
          err.code === 404 ? throwError('Not Found') :
          err.code === 401 ? throwError('Unauthorized') : throwError(err))
      );
  }

  getSingleRepository(repoName: string): Observable<any> {
    const options = repoName ?
      { params: new HttpParams().set('repositoryName', repoName) } : {};
    return this.http
      .get(`${this.API_URL}/repositories/repository`, options)
      .pipe(
        timeout(25000),
        catchError(err =>
          err.name === 'TimeoutError' ? throwError('Get repository timed out') :
            err.code === 404 ? throwError('Not found') :
            err.code === 401 ? throwError('Unauthorized') : throwError(err),
        ),
      );
  }
}
