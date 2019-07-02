import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GetRepositoriesService } from './get.repositories.service';
import { DefaultFilterObjectInterface } from '../interfaces/default.filter.object.interface';

@Injectable()
export class DataService {
  protected repositories = [];
  protected internalFilterResult = [];
  protected repositoriesSubject = new BehaviorSubject([]);
  protected projectBranchesSubject = new BehaviorSubject([]);

  constructor(protected repositoryService: GetRepositoriesService) {}

  public loadReposNames() {
    return this.repositoryService.getRepositoryNames();
  }

  public getReposData(param) {
    this.repositories.length = 0;
    return this.repositoryService.getSingleRepository(param).subscribe(res => {
      if(!res) {
        return null;
      } else {
        this.repositories.push(res);
        this.repositoriesSubject.next(this.repositories);
      }
    }, err => {
      return err;
    });
  }

  public getBranchesForSpecificProject(repoName: string) {
    return this.repositoryService.getBranchesForSpecificProject(repoName)
      .subscribe((res: any) => {
        this.projectBranchesSubject.next(res);
      });
  }

  public updateSingeRepository(repositoryName: string, branchOne: string, branchTwo: string) {
    return this.repositoryService.updateSingleRepositoryDataByCustomBranches(repositoryName, branchOne, branchTwo)
        .subscribe((res: any) => {
          this.repositories = res;
          this.repositoriesSubject.next(this.repositories);
        });
  }

  private filterByPrivacyAndBranches(filterObject: DefaultFilterObjectInterface) {
    console.log(filterObject);
    return this.repositories.filter(repository =>
        repository.repoType === filterObject.repoType
         || filterObject.repoType === 'default'
    );
  }

  public filteredByPackages(key: string, defaultFilterObject: DefaultFilterObjectInterface, filterObject: any) {
    const arrayOfFilteredRepos = this.filterByPrivacyAndBranches(defaultFilterObject);

    const keys = Object.keys(filterObject);
    const result = arrayOfFilteredRepos.filter((item) => {
        let found = true;
        for (let elem of keys) {
          if (!filterObject[elem]) {
            continue;
          }
          if (item.branches.master && item.branches.master[elem]) {
            found = item.branches.master[elem].indexOf(filterObject[elem]) !== -1;
          } else if (item.branches.development && item.branches.development[elem]) {
            found =  item.branches.development[elem].indexOf(filterObject[elem]) !== -1;
          } else {
             found = false;
          }
          if (found) {
            return found;
          }
        }
        return found;
      });

    const filteredResult = result.filter(item => {
      if(!key) {
       return true;
      }
      if (item.branches.master && item.branches.master[key]) {
        return item.branches.master[key].indexOf(filterObject[key]) >= 0;
      } else if (item.branches.development && item.branches.development[key]) {
        return item.branches.development[key].indexOf(filterObject[key]) >= 0;
      }
    });

    if (!filterObject[key]) {
      this.repositoriesSubject.next(result);
    } else {
      this.repositoriesSubject.next(filteredResult);
    }
  }

  get branchesSubject() {
    return this.projectBranchesSubject;
  }

  get subject() {
    return this.repositoriesSubject;
  }
}
