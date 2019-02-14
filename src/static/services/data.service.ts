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

  public getReposData(param) {
    return this.repositoryService.getAllRepositories(param).subscribe((res) => {
      this.repositories.push(res);
      this.repositoriesSubject.next(this.repositories);
    });
  }

  public getRepositoriesNames() {
    return this.repositoryService.getRepositoryNames()
      .subscribe(result => {
        this.repoNames = result;
        for (let element of this.repoNames) {
          this.getReposData(element.repoName);
        }
      });
  }

  public filterByPrivacyAndBranches(value: string) {
    const result = this.repositories.filter(item =>
      item.repoType === value
      || (value === 'master' && !item.branches[value])
      || (value === 'development' && !item.branches[value])
      || (value === 'none' && !item.branches)
      || value === 'default');
    this.repositoriesSubject.next(result);
  }

  public filterByPackages(value: any) {
    const result = this.repositories.filter(item =>
        item.repoName.toLowerCase().indexOf(value.version, 0) >= 0
        || DataService.getDataFromObject(item.branches.master, value.packageName, value.version)
        || DataService.getDataFromObject(item.branches.development, value.packageName, value.version)
        || DataService.isNone(item.branches, value.packageName, value.version));
    this.repositoriesSubject.next(result);
  }

  private static isNone(item, packageName, value) {
    if (Object.keys(item).length === 2) {
      if (packageName === 'repoName') {
        return false;
      } else if (!item.master[packageName] && !item.development[packageName] && value === 'none') {
        return true;
      }
    } else {
      return null;
    }
  }

  private static getDataFromObject(branch, packageName, version?) {
    if (branch) {
      if(branch[packageName]) {
        const str = branch[packageName];
        if (str.indexOf(version, 0) >= 0) {
          return branch[packageName];
        }
      }
    } else {
      return null;
    }
  }

  get subject() {
    return this.repositoriesSubject;
  }
}