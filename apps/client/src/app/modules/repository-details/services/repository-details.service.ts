import { Injectable } from '@angular/core';
import { ShieldsService } from '../../../shared/services/shields.service';
import { DataService } from '../../../shared/services/data.service';

@Injectable()
export class RepositoryDetailsService {

  constructor(
    private readonly dataService: DataService,
    private readonly shieldsService: ShieldsService
  ) {  }

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

  public removeBranches(login: string, repoName: string, branchesData: any) {
    return this.dataService.removeComparing(login, repoName, branchesData);
  }

}
