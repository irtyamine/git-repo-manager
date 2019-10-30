import { Body, Controller, Get, Post, Req, Delete } from '@nestjs/common';
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
    return await this.stateService.getBranchesFromGithub(req.query.repoName, req.cookies['_auth_token']);
  }

  @Get('repository')
  findRepository(@Req() req) {
    return this.stateService.findRepoDataAtDatabase(req.query.repositoryName, req.cookies['_auth_token']);
  }

  @Post('update-repo-data')
  async updateRepoData(@Req() req, @Body() body) {
    return await this.stateService.updateRepoByNewBranches(body, req.cookies['_auth_token']);
  }
}
