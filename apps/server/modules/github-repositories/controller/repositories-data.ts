import { Controller, Get, Res } from '@nestjs/common';
import { GetRepositoriesDataService } from '../services/get-repositories-data.service';
import { PackagesService } from '../services/packages.service';

@Controller('github/repositories')

export class RepositoriesData {

  constructor(
    private readonly getRepositories: GetRepositoriesDataService,
    private readonly packagesService: PackagesService
  ) {  }

  @Get('all-repositories')
  async getOrgRepositories(@Res() res) {
    const result = await this.getRepositories.getRepositories('valor-software', 'github');
    res.json(result);
  }

  @Get('packages')
  async getPackages(@Res() res) {
    const packages = await this.packagesService.getPackages();
    res.json(packages);
  }
}
