import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { FrontendConfigService } from '../frontend-config/frontend-config.service';

@Injectable()

export class GetRepositoriesService {

  constructor(private http: HttpClient, public configFile: FrontendConfigService) {}

  get getConfigurationFile() {
    return this.configFile.frontendConfig;
  }

  getRepositoryNames() {
    return this.http
      .get(`${this.configFile.frontendConfig.url.localhost}/repositories/names`)
      .pipe(
        catchError(err =>
        err.code === 404 ? throwError('Not Found') : throwError(err))
      );
  }

  getAllRepositories(repoName: string): Observable<any> {
    const options = repoName ?
      { params: new HttpParams().set('repositoryName', repoName) } : {};
    return this.http
      .get(`${this.configFile.frontendConfig.url.localhost}/repositories/all-repositories`, options)
      .pipe(
        catchError(err =>
          err.code === 404 ? throwError('Not found') : throwError(err),
        ),
      );
  }
}
