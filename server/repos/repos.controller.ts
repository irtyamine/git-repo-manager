import { Controller, Get, Res } from '@nestjs/common';
import { GitHubRepositoriesService } from './repos.service';
import * as path from 'path';

@Controller('repositories')
export class RepositoriesController {
  constructor(private readonly repositoryService: GitHubRepositoriesService) {}

  @Get()
  root(@Res() response) {
    response.sendFile(path.resolve('../../dist/index.html'));
  }

  @Get('repository')
  async getRepo() {
    return await this.repositoryService.getRepositories();
  }

  @Get('all-repositories')
  findAllRepositories() {
    return this.repositoryService.findAllDataAtDatabase();
  }
}
