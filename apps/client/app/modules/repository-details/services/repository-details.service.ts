import { Injectable } from '@angular/core';
import { StoreService } from '../../../shared/services/store.service';
import { DataService } from '../../../shared/services/data.service';

@Injectable()
export class RepositoryDetailsService {
  private authData: any;

  constructor(
    private readonly store: StoreService,
    private readonly dataService: DataService
  ) {
    this.authData = this.store.getAuthData();
  }

  public getRepositoryDetails() {
    return this.dataService.getRepositoryDetails();
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

  public getUserData() {
    return this.dataService.getUserData();
  }

}
