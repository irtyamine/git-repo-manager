import { Controller, Get, Res } from '@nestjs/common';
import { UpdateRepositoriesService } from '../services/update-repositories.service';

@Controller('repositories')

export class RepositoriesData {

  constructor(private readonly repositoriesService: UpdateRepositoriesService) {  }

  @Get('names')
  async getOrgRepositories(@Res() res) {
    const result = await this.repositoriesService.getOrgRepositories();
    res.json(result);
  }

}
