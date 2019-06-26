import {
  Controller,
  Get,
  UseGuards,
  Res,
  Req,
  UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GithubRepositoryLayer } from './repository-layer';

@Controller('repositories2')
export class AuthController {
  constructor(private auth: AuthService, private githubRepository: GithubRepositoryLayer) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubLogin() {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  githubLoginCallback(@Req() req, @Res() res) {
    const authToken: string = req.user.jwt;
    if (authToken && req.user.organizationName === process.env.ACCESS_GITHUB_ORGANIZATION) {
      res.cookie('_auth_token', authToken, { expires: new Date(Date.now() + (3600 * 5 * 1000)) });
      res.redirect(`${process.env.URL}/table-repositories`);
    } else {
      res.redirect(`${process.env.URL}/login`);
    }
  }

  @Get('get-user-data')
  async getUserData(@Req() req) {
    return await this.auth.getUserLoginAndStatus(req.cookies['_auth_token']);
  }

  @Get('isAuthenticated')
  isAuthenticated(@Req() req: Request, @Res() res) {
    this.githubRepository.deleteOldAuthTokens(Date.now());
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
    res.redirect(`${process.env.URL}/login`);
  }
}
