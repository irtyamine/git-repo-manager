import { Controller, Post, Get, Body, UseGuards, Res } from '@nestjs/common';
import { GithubAuthService } from '../services/github-auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/github')
export class GithubAuthController {

  constructor(private readonly githubAuth: GithubAuthService) {  }

  @Post('organization-check')
  async orgCheck(@Body() body) {
    return await this.githubAuth.checkForOrganization(body);
  }

  @Get('login')
  @UseGuards(AuthGuard('github'))
  gitHubLogin() {}

  @Get('callback')
  gitHubAuthCallback(@Res() res) {
    res.redirect('http://localhost:3000/all-projects');
  }

}
