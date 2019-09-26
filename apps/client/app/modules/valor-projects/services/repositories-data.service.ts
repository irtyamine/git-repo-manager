import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RepositoriesDataService {
  private availablePackages = new BehaviorSubject<any>([]);
  private companyRepositories = new BehaviorSubject<any>([]);

  constructor(private readonly http: HttpClient) {
    this.getPackages();
    this.getRepositories();
  }

  private getPackages() {
    return this.http.get(`${environment.url}/github/repositories/packages`)
      .pipe()
      .subscribe(packages => {
        this.availablePackages.next(packages);
      });
  }

  private getRepositories() {
    return this.http.get(`${environment.url}/github/repositories/all-repositories`)
      .pipe()
      .subscribe(repositories => {
        this.companyRepositories.next(repositories);
      });
  }

  public get packages() {
    return this.availablePackages;
  }

  public get repositories() {
    return this.companyRepositories;
  }
}
