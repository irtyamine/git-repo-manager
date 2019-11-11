import { Injectable } from '@angular/core';
import { ShieldsService } from '../../../shared/services/shields.service';
import { StoreService } from '../../../shared/services/store.service';
import { DataService } from '../../../shared/services/data.service';

@Injectable()
export class RepositoryDetailsService {
  private authData: any;

  constructor(
    private readonly store: StoreService,
    private readonly dataService: DataService,
    private readonly shieldsService: ShieldsService
  ) {
    this.authData = this.store.getAuthData();
  }

  public getRepositoryDetails() {
    return this.dataService.getRepositoryDetails();
  }

  public getDefaultBranchesData(branches: any) {
    const { baseBranch, compareBranch } = branches;

    return this.shieldsService.setShieldsForRepositoryDefaultBranches(baseBranch, compareBranch);
  }

  public getUserData() {
    return this.dataService.getUserData();
  }

}
