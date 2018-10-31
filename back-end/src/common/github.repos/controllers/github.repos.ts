import { Controller, Get } from '@nestjs/common';
import { GithubReposService } from '../../../services/github.repos.service';

@Controller('repos')
export class GithubRepos {
    constructor(private readonly repo: GithubReposService) {  }

    @Get('get-repository')
    async getRepo() {
        console.log(`Response status - 200. Time: ${new Date}`);
        return await this.repo.getRepo();
    }
}
