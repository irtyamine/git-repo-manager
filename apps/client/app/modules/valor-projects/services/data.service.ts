import { Injectable } from '@angular/core';
import { RepositoriesDataService } from './repositories-data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
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
        this.companyRepositories.next(repositories);
      });

  }

  public getRepositoriesData() {
    return this.reposDataService.getPackages()
      .subscribe(packages => {
        this.availablePackages.next(packages);
      });
  }

  public get packages() {
    return this.availablePackages;
  }

  public get repositories() {
    return this.companyRepositories;
  }
}
