import { Controller, Post, Get, Body, UseGuards, Req, Res } from '@nestjs/common';
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
  gitHubLogin() {  }

  @Get('callback')
  @UseGuards(AuthGuard('github'))
  gitHubAuthCallback(@Req() req, @Res() res) {
    if (!req.user.token) {
      res.redirect('back');
    }
    else {
      res.cookie('_auth_token', '111111111', { expires: new Date(Date.now() + (3600 * 5 * 1000)) });
      res.redirect('../../all-projects');
    }
  }

  @Get('isAuthenticated')
  checkIfUserAuthenticated(@Req() req) {
    console.log(req.session);
    if (!req.cookies['_auth_token']) {
      return false;
    }
    else {
      return true;
    }
  }

  @Get('logout')
  logOut(@Res() res) {
    res.clearCookie('_auth_token');
    res.redirect('../../login');
  }
}
