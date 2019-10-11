import { Controller, Post, Body } from '@nestjs/common';
import { GithubAuthService } from '../services/github-auth.service';

@Controller('api/github')
export class GithubAuthController {

  constructor(private readonly githubAuth: GithubAuthService) {  }

  @Post('organization-check')
  async orgCheck(@Body() body) {
    return await this.githubAuth.checkForOrganization(body);
  }

}
