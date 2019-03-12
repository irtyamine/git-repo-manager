import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('repositories1')

export class GithubController {

  constructor(private service: GithubService) {}

  @Get('get-user-data')
  getUser() {
    return this.service.getUser();
  }

  @Post('new-data')
  createData(@Body() body) {
    return this.service.createUser(body);
  }
}