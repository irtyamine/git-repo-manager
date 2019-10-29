import { Controller, Post, Get, Body, UseGuards, Req, Res } from '@nestjs/common';
import { GithubAuthService } from '../services/github-auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Cookies } from '../../../decorators/cookies.decorator';

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
    if (!req.user.authToken) {
      res.redirect('back');
    }
    else {
      res.cookie('_auth_token', req.user.authToken, { expires: new Date(req.user.expiresTime) });
      res.redirect('../../repositories');
    }
  }

  @Get('user')
  async getUser(@Req() req) {
    return await this.githubAuth.getUserInfo(req.cookies['_auth_token']);
  }

  @Get('isAuthenticated')
  checkIfUserAuthenticated(@Cookies() cookies) {
    if (!cookies['_auth_token']) {
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
