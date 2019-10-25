import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { RepositoryDetailsService } from '../services/repository-details.service';
import { StoreService } from '../../../shared/services/store.service';
import { DataService } from '../../company-projects/services/data.service';
import { ShieldsService } from '../../../shared/services/shields.service';
import * as semver from 'semver';

@Component({
  selector: 'repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.scss']
})

export class RepositoryDetailsComponent implements OnInit {
  public repository: string;
  public repositoryData: any;
  public warnings: Object[];
  public warningsCounter: number = 0;
  public defaultBranchesShield: string;
  public defaultBranches: Object[] = [];
  public dependencies: Object[] = [];

  constructor(
    private readonly lsService: LocalStorageService,
    private readonly repoDetailsService: RepositoryDetailsService,
    private readonly store: StoreService,
    private readonly dataService: DataService,
    private readonly shields: ShieldsService
  ) {  }

  ngOnInit(): void {
    this.repository = this.lsService.getItem('repository');
    this.getRepositoryDetails(this.repository);
  }

  private getRepositoryDetails(repository: string) {
    this.repoDetailsService
      .getRepositoryDetails(repository)
      .subscribe((res: any) => {
        this.repositoryData = res;

        this.setDefaultBranchesShields(res.branches);
        this.getBranches(res.branches);

        this.dependencies = this.setRepositoryDependencies(res.branches);
        this.checkForImportantDependencies(this.dependencies);
      });
  }

  private setDefaultBranchesShields(branches: any) {
    this.defaultBranchesShield = this.repoDetailsService
      .getDefaultBranchesData(
        Object.keys(branches)
      );
  }

  private getBranches(branches: any) {
    this.defaultBranches = Object.keys(branches);

    return this.defaultBranches;
  }

  private setRepositoryDependencies(branches: any) {
    return Object.keys(
      Object.assign({}, branches['master'], branches['development'])
    );
  }

  public getDependenciesFromBranch(branchData: any) {
    return Object.keys(branchData);
  }

  public setVersionStatus(dependency: string, branch: string) {
    const packages = this.dataService.packages.getValue();
    const { recommendVersion } = packages.find((pkg: any) => pkg.name === dependency);
    const dependencyVersion = this.repositoryData.branches[branch][dependency];

    if (!recommendVersion) {
      return 'success';
    }

    try {
     if (semver.lt(dependencyVersion, recommendVersion)) {
       return 'danger';
     }
    } catch (error) {
      return 'danger';
    }

    return 'success';
  }

  public setShieldForDependency(dependency: string) {
    return this.shields.setShieldsForDependencies(dependency);
  }

  public setRepoDependenciesShields(dependency: string) {
    return this.shields.setRepositoryDependencies(dependency);
  }

  private checkForImportantDependencies(dependencies: any) {
    const packages = this.dataService.packages.getValue();
    const importantDependencies = packages.filter((pkg: any) => pkg.isImportant);

    for (let importantDependency of importantDependencies) {
     const res = dependencies.find((dependency: any) => dependency === importantDependency.name);

      if (!res) {
        this.store.setWarnings(importantDependency.name, `important dependency '${importantDependency.name}' missed`);
      }

      this.warnings = this.store.getWarnings();
      this.warningsCounter = this.warnings.length;
    }
  }
}
