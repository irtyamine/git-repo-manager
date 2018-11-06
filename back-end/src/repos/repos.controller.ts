import { Controller, Get } from '@nestjs/common';
import { ReposService } from './repos.service';

@Controller('repos')
export class ReposController {
    constructor(private readonly repo: ReposService) {  }

    @Get('get-repository')
    async getRepo() {
        console.log(`Response status - 200. Time: ${new Date}`);
        return await this.repo.getRepo();
    }
}
