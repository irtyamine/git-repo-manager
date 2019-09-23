import { Controller, Get, Res } from '@nestjs/common';
import { GetRepositoriesDataService } from '../services/get-repositories-data.service';

@Controller('github/repositories')

export class RepositoriesData {

  constructor(
    private readonly getRepositories: GetRepositoriesDataService
  ) {  }

  @Get('all-repositories')
  async getOrgRepositories(@Res() res) {
    const result = await this.getRepositories.getRepositories('valor-software', 'github');
    res.json(result);
  }

}
