import { Injectable } from '@angular/core';
import { RepositoriesDataService } from '../../../shared/services/repositories-data.service';
import { DataService } from '../../../shared/services/data.service';

import { FilteringOptionsInterface } from '../interfaces/filteringOptions.interface';
import { RepositoryInterface } from '../interfaces/repository.interface';
import { options } from 'tsconfig-paths/lib/options';

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
    const result = this.filteringOptions.find((option: FilteringOptionsInterface) => option.key === newFilteringOptions.key);
    const branchesFilter = this.filteringOptions.find((option: FilteringOptionsInterface) => option.key === 'branches');
    const missedBranchesFilter = this.filteringOptions.find((option: FilteringOptionsInterface) => option.key === 'missingBranches');

    if (this.filteringOptions.length === 0) {
      this.filteringOptions.push(newFilteringOptions);
      return this.filterData(this.filteringOptions);
    }

    if (newFilteringOptions.key === 'branches' && missedBranchesFilter) {
      const optionIndex = this.filteringOptions.indexOf(missedBranchesFilter);
      this.filteringOptions.splice(optionIndex, 1, newFilteringOptions);
      return this.filterData(this.filteringOptions);
    }

    if (newFilteringOptions.key === 'missingBranches' && branchesFilter) {
      const optionIndex = this.filteringOptions.indexOf(branchesFilter);
      this.filteringOptions.splice(optionIndex, 1, newFilteringOptions);
      return this.filterData(this.filteringOptions);
    }

    if (!result) {
      this.filteringOptions.push(newFilteringOptions);
    }
    else {
      const optionIndex = this.filteringOptions.indexOf(result);
      this.filteringOptions.splice(optionIndex, 1, newFilteringOptions);
    }

    return this.filterData(this.filteringOptions);
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
      const repositoryBranches = Object.keys(repository.branches);

      const firstBranchName = repositoryBranches[0];
      const firstBranchData = repository.branches[firstBranchName];

      const secondBranchName = repositoryBranches[1];
      const secondBranchData = repository.branches[secondBranchName];

      return filteringOptions.every(option => {

        if (option.value === 'none') {
          return (!firstBranchData || !firstBranchData[option.key]) && (!secondBranchData || !secondBranchData[option.key]);
        }

        if (option.key === 'branches') {
          return (firstBranchName && firstBranchName.indexOf(option.value) !== -1)
            || (secondBranchName && secondBranchName.indexOf(option.value) !== -1);
        }

        if (option.key === 'missingBranches') {
          return repositoryBranches.length === 1
            && firstBranchName.indexOf(option.value) !== -1;
        }

        if (repository[option.key]) {
          return repository[option.key].indexOf(option.value, 0) !== -1;
        }

        if ((firstBranchData && firstBranchData[option.key]) && (secondBranchData && secondBranchData[option.key])) {
          return firstBranchData[option.key].indexOf(option.value, 0) !== -1
            || secondBranchData[option.key].indexOf(option.value, 0) !== -1;
        }

        if (firstBranchData && firstBranchData[option.key]) {
          return firstBranchData[option.key].indexOf(option.value, 0) !== -1;
        }

        if (secondBranchData && secondBranchData[option.key]) {
          return secondBranchData[option.key].indexOf(option.value, 0) !== -1;
        }

        return false;
      });
    });

    this.dataService.setRepositories(filteredOptions);
  }

}
