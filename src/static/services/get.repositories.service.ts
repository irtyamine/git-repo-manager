import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from '../../../config/config.service';

@Injectable()

export class GetRepositoriesService {

  public config: any;
  constructor(private http: HttpClient, public configFile: ConfigService) {
    this.config = this.configFile.config;
  }

  getConfigurationFile() {
    return this.config;
  }

  getRepositoryNames() {
    return this.http
      .get(`${this.config.url.localhost}/repositories/names`)
      .pipe(
        catchError(err =>
        err.code === 404 ? throwError('Not Found') : throwError(err))
      );
  }

  getAllRepositories(repoName: string): Observable<any> {
    const options = repoName ?
      { params: new HttpParams().set('repositoryName', repoName) } : {};
    return this.http
      .get(`${this.config.url.localhost}/repositories/all-repositories`, options)
      .pipe(
        catchError(err =>
          err.code === 404 ? throwError('Not found') : throwError(err),
        ),
      );
  }
}
