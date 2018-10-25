import { Controller, Get, Req, Post, Res, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { GithubReposService } from '../services/github.repos.service';
import { CreateRepoDto } from '../dto/create-repo.dto';
import { Repo } from '../interfaces/repo.interface';

@Controller('repos')
export class GithubRepos {
    constructor(private readonly repo: GithubReposService) {  }

    @Get('get-repository')
    async getRepo(
        @Req() req: Request,
        @Res() res: Response
    ) {
        let a = await this.repo.getRepo();
        console.log(1111);
        return res.json(a);
    }
}
