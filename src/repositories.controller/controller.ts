import { Body, Controller, Get, Put, Req } from '@nestjs/common';
import { RepoStateService } from './services/repo.state';

const GitHubRepositoriesConfigurationFile = require('../../github-repositories-config.json');

@Controller('repositories')
export class RepositoriesController {
  constructor(
      private readonly stateService: RepoStateService
  ) {  }

  @Get('recommend-versions')
  findRecommendVersions() {
    return GitHubRepositoriesConfigurationFile.RECOMMENDED_AT_VALOR_VERSIONS;
  }

  @Get('names')
  getNames() {
    return this.stateService.getNames();
  }

  @Get('branches-for-project')
  async getBranches(@Req() req) {
    return await this.stateService.getBranchesFromGithub(req.query.repoName);
  }

  @Get('repository')
  findRepository(@Req() req) {
    return this.stateService.findRepoDataAtDatabase(req.query.repositoryName);
  }

  @Put('update-repo-data')
  async updateRepoData(@Body() body) {
    return await this.stateService.updateRepoByNewBranches(body);
  }
}
