import { Injectable } from '@angular/core';
import { RepositoriesDataService } from './repositories-data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private availablePackages = new BehaviorSubject<any>([]);
  private companyRepositories = new BehaviorSubject<any>([]);

  constructor(private readonly reposDataService: RepositoriesDataService) {
    this.getPackagesData();
    this.getRepositoriesData();
  }

  public getPackagesData() {
    return this.reposDataService.getRepositories()
      .subscribe(repositories => {
        this.setRepositories(repositories);
      });

  }

  public getRepositoriesData() {
    return this.reposDataService.getPackages()
      .subscribe(packages => {
        this.setPackagesData(packages);
      });
  }

  public getUserData() {
    return this.reposDataService.getUserData();
  }

  public getRepositoryDetails() {
    return this.reposDataService.getRepositoryDetails();
  }

  public setPackagesData(packages: any) {
    this.availablePackages.next(packages);
  }

  public setRepositories(repositories: any) {
    this.companyRepositories.next(repositories);
  }

  public get packages() {
    return this.availablePackages;
  }

  public get repositories() {
    return this.companyRepositories;
  }
}
