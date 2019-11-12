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
    const { organization, dataSource } = this.store.getAuthData();

    const options = {
      params: new HttpParams()
        .set('organization', organization)
        .set('dataSource', dataSource)
    };

    return this.http.get(`${environment.url}/api/${dataSource}/repositories/packages`, options)
      .pipe();
  }

  public getRepositories() {
    const { organization, dataSource } = this.store.getAuthData();

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
    const { organization, dataSource } = this.store.getAuthData();

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

  public getCustomBranches(userName: string, repoName: string) {
    const { organization, dataSource } = this.store.getAuthData();

    const options = {
      params: new HttpParams()
        .set('addedBy', userName)
        .set('repoName', repoName)
        .set('organization', organization)
        .set('vcs', dataSource)
    };

    return this.http.get(`${environment.url}/api/${dataSource}/repositories/custom-branches`, options)
      .pipe();
  }

  public setCustomBranchesData(
    branches: {
      baseBranch: string,
      compareBranch: string
    },
    repoName: string,
    userName: string
  ) {
    const { organization, dataSource } = this.store.getAuthData();

    const body = {
      repoName: repoName,
      userName: userName,
      organization: organization,
      baseBranch: branches.baseBranch,
      compareBranch: branches.compareBranch
    };

    return this.http
      .post(`${environment.url}/api/${dataSource}/repositories/add-custom-branches`, body)
      .pipe();
  }

  public removeComparing(login: string, repoName: string, branchesData: any) {
    const { organization, dataSource } = this.store.getAuthData();

    const options = {
      params: new HttpParams()
        .set('repoName', repoName)
        .set('userName', login)
        .set('organization', organization)
        .set('vcs', dataSource)
        .set('baseBranch', branchesData.branches.baseBranch.branchName)
        .set('compareBranch', branchesData.branches.compareBranch.branchName)
    };

    return this.http.delete(`${environment.url}/api/${dataSource}/repositories/remove-custom-branches`, options)
      .pipe();
  }
}
