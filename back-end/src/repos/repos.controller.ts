import { Controller, Get } from '@nestjs/common';
import { GitHubRepositoriesService } from './repos.service';

@Controller('repositories')
export class RepositoriesController {
    constructor(private readonly repositoryService: GitHubRepositoriesService) {}

    @Get('repository')
    async getRepo() {
        return await this.repositoryService.getRepositories();
    }

    @Get('all-repositories')
    findAllRepositories() {
        return this.repositoryService.findAllDataAtDatabase();
    }
}
