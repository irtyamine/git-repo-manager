import { Controller, Get, Req } from '@nestjs/common';
import { GitHubRepositoriesService } from './repositories.service';

@Controller('repositories')
export class RepositoriesController {
  constructor(private readonly repositoryService: GitHubRepositoriesService) {}

  @Get('names')
  getNames() {
    return this.repositoryService.getNamesFromDB();
  }

  @Get('all-repositories')
  findAllRepositories(@Req() req) {
    return this.repositoryService.findAllDataAtDatabase(req.query.repositoryName);
  }
}
