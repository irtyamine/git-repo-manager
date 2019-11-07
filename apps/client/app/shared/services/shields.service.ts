import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class ShieldsService {

  constructor(
    private readonly dataService: DataService
  ) {  }


  public setShieldsForDependencies(dependency: string) {
    const packages = this.dataService.packages.getValue();
    const packageData = packages.find((pkj: any) => pkj.name === dependency);

    if (!packageData.recommendVersion) {
      return `https://img.shields.io/badge/-${dependency}-blue?style=flat-square`;
    }

    return `https://img.shields.io/badge/${dependency}-${packageData.recommendVersion}-blue?style=flat-square`;
  }

  public setRepositoryDependencies(dependency: string) {
    const packages = this.dataService.packages.getValue();
    const { isImportant } = packages.find((pkg: any) => {
      if (!pkg) {
        return;
      }
      return pkg.name === dependency
    });

    if (!isImportant) {
      return `https://img.shields.io/badge/-${dependency}-blue?style=flat-square`;
    }

    return `https://img.shields.io/badge/-${dependency}-important?style=flat-square`;
  }

}
