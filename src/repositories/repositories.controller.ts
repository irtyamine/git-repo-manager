import { Controller, Get, Req } from '@nestjs/common';
import { GitHubRepositoriesService } from './repositories.service';
const GitHubRepositoriesConfigurationFile = require('../../config/github-repositories-config.json');

@Controller('repositories')
export class RepositoriesController {
  constructor(private readonly repositoryService: GitHubRepositoriesService) {}

  @Get('recommend-versions')
  findRecommendVersions() {
    return GitHubRepositoriesConfigurationFile.RECOMMENDED_AT_VALOR_VERSIONS;
  }

  @Get('names')
  getNames(@Req() req) {
    return this.repositoryService.getNamesFromDB(req.cookies['_auth_token']);
  }

  @Get('repository')
  findRepository(@Req() req) {
    return this.repositoryService.findRepoDataAtDatabase(req.query.repositoryName);
  }
}
