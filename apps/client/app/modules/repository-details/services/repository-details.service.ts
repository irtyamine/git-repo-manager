import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StoreService } from '../../../shared/services/store.service';

import { environment } from '../../../../environments/environment';

@Injectable()
export class RepositoryDetailsService {
  private authData: any;

  constructor(
    private readonly store: StoreService,
    private readonly http: HttpClient
  ) {
    this.authData = this.store.getAuthData();
  }

  public getRepositoryDetails(repoName: string) {
    const options = {
      params: new HttpParams()
        .set('repoName', repoName)
        .set('organization', this.authData.organization)
    };

    return this.http
      .get(`${environment.url}/api/${this.authData.dataSource}/repositories/repository-details`, options)
      .pipe();
  }

  public getDefaultBranchesData(branches?: Object[]) {
    if (branches.length > 1) {
      return `https://img.shields.io/badge/default%20branches-${branches[0]} \u27F5 ${branches[1]}-green?style=flat-square`;
    }
    else {
      switch (branches[0]) {
        case 'master': {
          this.store.setWarnings(
            'development',
            'branch \'development\' missed'
          );
          return `https://img.shields.io/badge/default%20branches-${branches[0]}-red?style=flat-square`;
        }
        case 'development': {
          this.store.setWarnings(
            'master',
            'branch \'master\' missed'
          );
          return `https://img.shields.io/badge/default%20branches-${branches[0]}-red?style=flat-square`;
        }

      }
    }
  }

}
