import { Injectable } from '@angular/core';
import { RepositoriesDataService } from '../../../../shared/services/repositories-data.service';
import { DataService } from '../../../../shared/services/data.service';

import { FilteringOptionsInterface } from '../interfaces/filteringOptions.interface';
import { RepositoryInterface } from '../interfaces/repository.interface';

@Injectable()
export class FiltrationService {

  public filteringOptions = [];
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

  public clearFilters() {
    this.filteringOptions.length = 0;
    return this.filterData(this.filteringOptions);
  }

  public setFilterOptions(newFilteringOptions: FilteringOptionsInterface) {
    const optionByCompIndex = this.filteringOptions.find((
      option: FilteringOptionsInterface) =>
        option.compIndex === newFilteringOptions.compIndex);

    if (!optionByCompIndex) {
      this.filteringOptions.push(newFilteringOptions);
    }
    else {
      const optionIndex = this.filteringOptions.indexOf(optionByCompIndex);
      this.filteringOptions.splice(optionIndex, 1, newFilteringOptions);
    }

    return this.filterData(this.filteringOptions);
  }

  public removeFilter(removeIndex: number) {
    const optionByCompIndex = this.filteringOptions.find((
      option: FilteringOptionsInterface) =>
        option.compIndex === removeIndex);

    const elementIndex = this.filteringOptions.indexOf(optionByCompIndex);
    this.filteringOptions.splice(elementIndex, 1);

    return this.filterData(this.filteringOptions);
  }

  public filterData(filteringOptions: FilteringOptionsInterface[]) {

    const filteredOptions = this.repositories.filter((repository: RepositoryInterface) => {
      const { branches } = repository;
      const repositoryBranches = Object.keys(branches);

      const firstBranchData = branches['baseBranch'];
      const firstBranchName = firstBranchData ? firstBranchData['branchName'] : undefined;

      const secondBranchData = branches['compareBranch'];
      const secondBranchName = firstBranchData ? firstBranchData['branchName'] : undefined;

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
