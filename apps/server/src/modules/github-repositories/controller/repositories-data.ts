import { Controller, Get } from '@nestjs/common';
import { GetRepositoriesDataService } from '../services/get-repositories-data.service';
import { PackagesService } from '../services/packages.service';

@Controller('api/github/repositories')

export class RepositoriesData {

  constructor(
    private readonly getRepositories: GetRepositoriesDataService,
    private readonly packagesService: PackagesService
  ) {  }

  @Get('all-repositories')
  async getOrgRepositories() {
    return await this.getRepositories.getRepositories('valor-software', 'github');
  }

  @Get('packages')
  async getPackages() {
    return await this.packagesService.getPackages();
  }
}
