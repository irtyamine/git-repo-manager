import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { GetRepositoriesService } from './get.repositories.service';

@Injectable()
export class DataService {
  protected repositories = [];
  protected repositoriesSubject = new BehaviorSubject([]);

  constructor(protected repositoryService: GetRepositoriesService, protected router: Router) {
    this.getNames();
  }

  protected getReposData(param) {
    return this.repositoryService.getSingleRepository(param).subscribe((res) => {
      if(!res.repoName || !res.timestamp) {
        return;
      } else {
        this.repositories.push(res);
        this.repositoriesSubject.next(this.repositories);
      }
    });
  }

  protected getNames() {
    return this.repositoryService.getRepositoryNames()
      .subscribe(result => {
        for (let element of result) {
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
    if (branch && branch[packageName]) {
        const str = branch[packageName];
        if (str.indexOf(version, 0) >= 0) {
          return branch[packageName];
        }
        return null;
    } else {
      return null;
    }
  }

  get subject() {
    return this.repositoriesSubject;
  }
}
