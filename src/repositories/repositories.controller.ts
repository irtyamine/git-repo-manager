import { Controller, Get, Req } from '@nestjs/common';
import { GitHubRepositoriesService } from './repositories.service';
import { AuthService } from '../app.authentication/auth.service';
const GitHubRepositoriesConfigurationFile = require('../../config/github-repositories-config.json');

@Controller('repositories')
export class RepositoriesController {
  constructor(private readonly repositoryService: GitHubRepositoriesService, private auth: AuthService) {}

  @Get('recommend-versions')
  frontendPath() {
    return GitHubRepositoriesConfigurationFile.recommendedAtValorVersions;
  }

  @Get('names')
  getNames() {
    return this.repositoryService.getNamesFromDB();
  }

  @Get('all-repositories')
  findAllRepositories(@Req() req) {
    return this.repositoryService.findAllDataAtDatabase(req.query.repositoryName);
  }
}
