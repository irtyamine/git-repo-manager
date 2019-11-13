import { Injectable } from '@angular/core';
import { RepositoriesDataService } from './repositories-data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  protected availablePackages = new BehaviorSubject<any>([]);
  protected companyRepositories = new BehaviorSubject<any>([]);
  protected customBranchesSubject = new BehaviorSubject<any>([]);

  constructor(private readonly reposDataService: RepositoriesDataService) {
    this.getPackagesData();
    this.getRepositoriesData();
  }

  public getPackagesData() {
    return this.reposDataService.getPackages()
      .subscribe(packages => this.setPackagesData(packages));
  }

  public getRepositoriesData() {
    return this.reposDataService.getRepositories()
      .subscribe(repositories => this.setRepositories(repositories));
  }

  public getCustomBranches(userName: string, repoName: string) {
    return this.reposDataService.getCustomBranches(userName, repoName)
      .subscribe((customBranches: any) => this.setCustomBranches(customBranches));
  }

  public setCustomBranchesData(
    branches: {
      baseBranch: string,
      compareBranch: string
    },
    repoName: string,
    userName: string
  ) {
    return this.reposDataService.setCustomBranchesData(branches, repoName, userName);
  }

  public getUserData() {
    return this.reposDataService.getUserData();
  }

  public getRepositoryDetails() {
    return this.reposDataService.getRepositoryDetails();
  }

  public getAllRepoBranches(repoName: string) {
    return this.reposDataService.getAllRepoBranchesData(repoName);
  }

  public removeComparing(login: string, repoName: string, branchesData: any) {
    return this.reposDataService.removeComparing(login, repoName, branchesData)
      .subscribe(customBranches => {
        this.setCustomBranches(customBranches);
      });
  }

  public setPackagesData(packages: any) {
    this.availablePackages.next(packages);
  }

  public setRepositories(repositories: any) {
    this.companyRepositories.next(repositories);
  }

  public setCustomBranches(customBranches: any) {
    this.customBranchesSubject.next(customBranches);
  }

  public get packages() {
    return this.availablePackages;
  }

  public get repositories() {
    return this.companyRepositories;
  }

  public get customBranches() {
    return this.customBranchesSubject;
  }
}
