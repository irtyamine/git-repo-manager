import { Controller, Get, UseGuards, Res, Req, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GithubRepository } from './github.repository';
const authKeys = require('../../config/auth.keys.json');

@Controller('repositories2')
export class AuthController {
  constructor(private auth: AuthService, private githubrepository: GithubRepository) {}

  private API_URL = 'http://cf83561e.ngrok.io';

  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubLogin() {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  githubLoginCallback(@Req() req, @Res() res) {
    const authToken: string = req.user.jwt;
    if(authToken && req.user.organizationName === authKeys.organizations.ACCESS_GITHUB_ORGANIZATION) {
      res.cookie('_auth_token', authToken, { maxAge: 5 * 60 * 60 * 1000 });
      res.redirect(`${this.API_URL}/table-repositories`);
    } else {
      res.redirect(`${this.API_URL}/login`);
    }
  }

  @Get('isAuthenticated')
  isAuthenticated(@Req() req, @Res() res) {
    this.githubrepository.deleteOldAuthTokens();
    if (!req.cookies['_auth_token']) {
      res.json(false);
    } else {
      return this.auth.getUserPersonalAccesstoken(req.cookies['_auth_token'])
        .then(result => {
          res.json(true);
        }, err => {
          if(err.response.statusCode === 401) {
            res.clearCookie('_auth_token');
            throw new UnauthorizedException();
          }
        });
    }
  }

  @Get('logout')
  githubLogOut(@Res() res) {
    res.clearCookie('_auth_token');
    res.redirect(`${this.API_URL}/login`);
  }
}