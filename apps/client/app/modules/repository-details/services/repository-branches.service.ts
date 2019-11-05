import { Injectable } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';

@Injectable()
export class RepositoryBranchesService {

  constructor(
    private readonly dataService: DataService
  ) {}

  public getAllBranches(repositoryName: string) {
    return this.dataService.getAllRepoBranches(repositoryName);
  }

  public setNewCustomBranchesData(branches: { baseBranch: string, compareBranch: string }, repoName: string, userName: string) {
    return this.dataService.setCustomBranchesData(branches, repoName, userName);
  }
}
