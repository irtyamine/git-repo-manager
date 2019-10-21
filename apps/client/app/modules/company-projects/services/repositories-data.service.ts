import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StoreService } from '../../../shared/services/store.service';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

@Injectable()
export class RepositoriesDataService {
  constructor(
    private readonly http: HttpClient,
    private readonly store: StoreService
  ) {
    this.store.setAuthDataToStore();
  }

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
}
