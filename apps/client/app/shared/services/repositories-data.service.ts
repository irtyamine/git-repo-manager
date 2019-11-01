import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StoreService } from './store.service';
import { LocalStorageService } from './local-storage.service';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RepositoriesDataService {
  constructor(
    private readonly http: HttpClient,
    private readonly store: StoreService,
    private readonly lsService: LocalStorageService
  ) {  }

  public getUserData() {
    const { dataSource } = this.store.getAuthData();

    return this.http.get(`${environment.url}/api/${dataSource}/user`);
  }

  public getPackages() {
    const { organization } = this.store.getAuthData();
    const { dataSource } = this.store.getAuthData();

    const options = {
      params: new HttpParams()
        .set('organization', organization)
        .set('dataSource', dataSource)
    };

    return this.http.get(`${environment.url}/api/${dataSource}/repositories/packages`, options)
      .pipe();
  }

  public getRepositories() {
    const { organization } = this.store.getAuthData();
    const { dataSource } = this.store.getAuthData();

    const options = {
      params: new HttpParams()
        .set('organization', organization)
        .set('dataSource', dataSource)
    };

    return this.http.get(`${environment.url}/api/${dataSource}/repositories/all-repositories`, options)
      .pipe();
  }

  public getRepositoryDetails() {
    const repository = this.lsService.getItem('repository');
    const { organization } = this.store.getAuthData();
    const { dataSource } = this.store.getAuthData();

    const options = {
      params: new HttpParams()
        .set('repoName', repository)
        .set('organization', organization)
    };

    return this.http
      .get(`${environment.url}/api/${dataSource}/repositories/repository-details`, options)
      .pipe();
  }

  public getAllRepoBranchesData(repoName: string) {
    const options = { params: new HttpParams().set('repoName', repoName) };
    const { dataSource } = this.store.getAuthData();

    return this.http
      .get(`${environment.url}/api/${dataSource}/repositories/branches`, options)
      .pipe();
  }
}
