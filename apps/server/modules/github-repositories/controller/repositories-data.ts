import { Controller, Get, Res } from '@nestjs/common';

@Controller('github/repositories')

export class RepositoriesData {

  constructor() {  }

  @Get('names')
  async getOrgRepositories(@Res() res) {
    res.json({result: 1});
  }

}
