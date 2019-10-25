import { Injectable } from '@angular/core';
import { DataService } from '../../modules/company-projects/services/data.service';

@Injectable({ providedIn: 'root' })
export class ShieldsService {

  constructor(
    private readonly dataService: DataService
  ) {  }


  public setShieldsForDependencies(dependency: string) {
    const packages = this.dataService.packages.getValue();
    const { recommendVersion } = packages.find((pkj: any) => pkj.name === dependency);

    if (!recommendVersion) {
      return `https://img.shields.io/badge/-${dependency}-blue?style=flat-square`;
    }

    return `https://img.shields.io/badge/${dependency}-${recommendVersion}-blue?style=flat-square`;
  }

  public setRepositoryDependencies(dependency: string) {
    const packages = this.dataService.packages.getValue();
    const { isImportant } = packages.find((pkg: any) => pkg.name === dependency);

    if (isImportant) {
      return `https://img.shields.io/badge/-${dependency}-important?style=flat-square`;
    }
    else {
      return `https://img.shields.io/badge/-${dependency}-blue?style=flat-square`;
    }
  }

}
