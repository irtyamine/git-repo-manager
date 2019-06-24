import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GetRepositoriesService } from './get.repositories.service';

@Injectable()
export class DataService {
  protected repositories = [];
  protected repositoriesSubject = new BehaviorSubject([]);
  private currentVersionsForFiltering: any = [];

  constructor(protected repositoryService: GetRepositoriesService) {
      // this.setArrayForFiltering();
  }

  public loadReposNames() {
    return this.repositoryService.getRepositoryNames();
  }

  public getReposData(param) {
    return this.repositoryService.getSingleRepository(param).subscribe(res => {
      if(!res.repoName || !res.timestamp) {
        return null;
      } else {
        this.repositories.push(res);
        this.repositoriesSubject.next(this.repositories);
      }
    }, err => {
      return err;
    });
  }

  // private setArrayForFiltering() {
  //     this.getVersions().subscribe(versions => {
  //         this.currentVersionsForFiltering.push(
  //             { packageName: value.packageName, version: '' },
  //             { packageName: value.packageName, version: '' },
  //             { packageName: value.packageName, version: '' },
  //             { packageName: value.packageName, version: '' },
  //             );
  //         for (let item in versions) {
  //            this.currentVersionsForFiltering.push({ packageName: item, version: '' });
  //        }
  //         console.log(this.currentVersionsForFiltering);
  //     });
  // }

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
    // for(let elem of this.currentVersionsForFiltering) {
    //     if(elem.packageName === value.packageName) {
    //         elem.version = value.version;
    //     }
    // }
    //
    //   console.log(this.currentVersionsForFiltering);

      const result = this.repositories.filter(item =>
        item.repoName.toLowerCase().indexOf(value.version, 0) >= 0
        || DataService.isNone(item.branches, value.packageName, value.version)
        || DataService.getDataFromObject(item.branches.master, value.packageName, value.version)
        || DataService.getDataFromObject(item.branches.development, value.packageName, value.version));
    this.repositoriesSubject.next(result);
  }

  private static isNone(branches, packageName, value) {
    if(value === 'none') {
      if (!branches.master) {
        return !branches.development[packageName];
      } else if (!branches.development) {
        return !branches.master[packageName];
      } else return !branches.master[packageName] && !branches.development[packageName];
    } else {
      return false;
    }
  }

  private static getDataFromObject(branch, packageName, version?) {
    if (branch && branch[packageName]) {
        const str = branch[packageName];
        if (str.indexOf(version, 0) >= 0) {
          return branch[packageName];
        } else {
          return false;
        }
    } else {
      return false;
    }
  }

  get subject() {
    return this.repositoriesSubject;
  }
}
