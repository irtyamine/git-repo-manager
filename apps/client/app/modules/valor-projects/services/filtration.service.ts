import { Injectable } from '@angular/core';
import { RepositoriesDataService } from './repositories-data.service';
import { DataService } from './data.service';

import { FilteringOptionsInterface } from '../interfaces/filteringOptions.interface';
import { RepositoryInterface } from '../interfaces/repository.interface';

@Injectable()
export class FiltrationService {

  private filteringOptions = [];
  private repositories: any;

  constructor(
    private readonly service: RepositoriesDataService,
    private readonly dataService: DataService
  ) {
    this.service.getRepositories()
      .subscribe(repositories => {
        this.repositories = repositories;
      });
  }

  public setFilterOptions(newFilteringOptions: FilteringOptionsInterface) {

    if (this.filteringOptions.length === 0) {
      this.filteringOptions.push(newFilteringOptions);
    }
    else {
      const result = this.filteringOptions.find((option: FilteringOptionsInterface) => option.key === newFilteringOptions.key);
      if (!result) {
        this.filteringOptions.push(newFilteringOptions);
      } else {
        const optionIndex = this.filteringOptions.indexOf(result);
        this.filteringOptions.splice(optionIndex, 1, newFilteringOptions);
      }
    }

    this.filterData(this.filteringOptions);
  }

  public removeFilter(removeOption: string) {
    for (let option of this.filteringOptions) {
      if (option.key === removeOption) {
        const elementIndex = this.filteringOptions.indexOf(option);
        this.filteringOptions.splice(elementIndex, 1);
      }
    }

    return this.filterData(this.filteringOptions);
  }

  public filterData(filteringOptions: FilteringOptionsInterface[]) {

    const filteredOptions = this.repositories.filter((repository: RepositoryInterface) => {
      const firstBranch = repository.branches[Object.keys(repository.branches)[0]];
      const secondBranch = repository.branches[Object.keys(repository.branches)[1]];

      return filteringOptions.every(option => {

        if ((firstBranch && firstBranch[option.key]) && (secondBranch && secondBranch[option.key])) {
          return firstBranch[option.key].indexOf(option.value, 0) !== -1
            || secondBranch[option.key].indexOf(option.value, 0) !== -1;
        }

        if (firstBranch && firstBranch[option.key]) {
          return firstBranch[option.key].indexOf(option.value, 0) !== -1;
        }

        if (secondBranch && secondBranch[option.key]) {
          return secondBranch[option.key].indexOf(option.value, 0) !== -1;
        }

        return false;
      });
    });

    console.log(filteredOptions);

    this.dataService.setRepositories(filteredOptions);
  }

}
