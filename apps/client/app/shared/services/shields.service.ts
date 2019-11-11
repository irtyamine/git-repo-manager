import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { StoreService } from './store.service';

@Injectable({ providedIn: 'root' })
export class ShieldsService {

  private shieldsUrl: string = 'https://img.shields.io/badge';

  constructor(
    private readonly dataService: DataService,
    private readonly store: StoreService
  ) {  }


  public setShieldsForDependencies(dependency: string) {
    const packages = this.dataService.packages.getValue();
    const packageData = packages.find(pkj => pkj.name === dependency);

    if (!packageData.recommendVersion) {
      return `${this.shieldsUrl}/-${dependency}-blue?style=flat-square`;
    }

    return `${this.shieldsUrl}/${dependency}-${packageData.recommendVersion}-blue?style=flat-square`;
  }

  public setRepositoryDependencies(dependency: string) {
    const packages = this.dataService.packages.getValue();
    const { isImportant } = packages.find(pkg => pkg.name === dependency);

    if (!isImportant) {
      return `${this.shieldsUrl}/-${dependency}-blue?style=flat-square`;
    }

    return `${this.shieldsUrl}/-${dependency}-important?style=flat-square`;
  }

  public setShieldsForRepositoryDefaultBranches(baseBranch: any, compareBranch: any) {
    if (!baseBranch) {
      this.store.setWarnings('baseBranch', 'default base branch missed');
      return `${this.shieldsUrl}/default%20branches-${compareBranch.branchName}-red?style=flat-square`
    }

    if (!compareBranch) {
      this.store.setWarnings('compareBranch', 'default compare branch missed');
      return `${this.shieldsUrl}/default%20branches-${baseBranch.branchName}-red?style=flat-square`
    }

    return `${this.shieldsUrl}/default%20branches-${baseBranch.branchName}%20\u27F5%20${compareBranch.branchName}-green?style=flat-square`
  }

}
