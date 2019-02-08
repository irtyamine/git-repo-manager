import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GetRepositoriesService } from './get.repositories.service';

@Injectable()
export class DataService {
  private repositories: any[] = [];
  private repoNames: any;
  private repositoriesSubject = new BehaviorSubject([]);

  constructor(private repositoryService: GetRepositoriesService) {
    this.getRepositoriesNames();
  }

  private getRepositoriesNames() {
    return this.repositoryService.getRepositoryNames()
      .subscribe(result => {
        this.repoNames = result;
        for (let element of this.repoNames) {
          this.getReposData(element.repoName);
        }
      });
  }

  private getReposData(param) {
    return this.repositoryService.getAllRepositories(param).subscribe((res) => {
      this.repositories.push(res);
      this.repositoriesSubject.next(this.repositories);
    });
  }

  public filterByPrivacyAndBranches(value: string) {
    const result = this.repositories.filter(item =>
      item.repoType === value
      || value === 'master' && !item.branches[value]
      || value === 'development' && !item.branches[value]
      || value === 'none' && !item.branches
      || value === 'default');
    this.repositoriesSubject.next(result);
  }

  public filterByPackages(value: any) {
      const result = this.repositories.filter(item =>
        DataService.getDataFromObject(item.branches.master, value.packageName) === value.version
        || DataService.getDataFromObject(item.branches.development, value.packageName) === value.version
        || !DataService.getDataFromObject(item.branches.master, value.packageName)
        && !DataService.getDataFromObject(item.branches.development, value.packageName)
        && value.version === 'none'
        || item[value.packageName] === value.version
        || !value.version);
    this.repositoriesSubject.next(result);
  }

  private static getDataFromObject(branch, packageName) {
    if (branch) return branch[packageName];
  }

  get subject() {
    return this.repositoriesSubject;
  }
}