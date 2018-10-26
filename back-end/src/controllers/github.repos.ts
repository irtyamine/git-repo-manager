import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { GithubReposService } from '../services/github.repos.service';

@Controller('repos')
export class GithubRepos {
    constructor(private readonly repo: GithubReposService) {  }

    @Get('get-repository')
    async getRepo(
        @Req() req: Request,
        @Res() res: Response
    ) {
        let result = await this.repo.getRepo();
        console.log(`Response status - 200. Time: ${new Date}`);
        return res.json(result);
    }
}
