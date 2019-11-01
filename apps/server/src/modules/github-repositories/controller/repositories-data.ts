import { Controller, Get, Query } from '@nestjs/common';
import { GetRepositoriesDataService } from '../services/get-repositories-data.service';
import { PackagesService } from '../services/packages.service';
import { BranchesService } from '../services/branches.service';
import { Cookies } from '../../../decorators/cookies.decorator';

@Controller('api/github/repositories')

export class RepositoriesData {

  constructor(
    private readonly getRepositories: GetRepositoriesDataService,
    private readonly packagesService: PackagesService,
    private readonly branchesService: BranchesService
  ) {  }

  @Get('all-repositories')
  async getOrgRepositories(@Query() query) {
    return await this.getRepositories.getRepositories(query);
  }

  @Get('packages')
  async getPackages(@Query() query) {
    return await this.packagesService.getPackages(query);
  }

  @Get('repository-details')
  async getRepositoryDetails(@Query() query) {
    return await this.getRepositories.getRepoDetails(query);
  }

  @Get('branches')
  async getAllRepositoryBranches(@Query() query, @Cookies() cookies) {
    return await this.branchesService
      .getUserBranches(
        query.repoName,
        cookies['_auth_token']
      );
  }
}
