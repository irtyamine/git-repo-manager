import { Controller, Get, Req } from '@nestjs/common';
import { RepoStateService } from './services/repo.state.service';

const GitHubRepositoriesConfigurationFile = require('../../config/github-repositories-config.json');

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

  @Get('repository')
  findRepository(@Req() req) {
    return this.stateService.findRepoDataAtDatabase(req.query.repositoryName);
  }
}
