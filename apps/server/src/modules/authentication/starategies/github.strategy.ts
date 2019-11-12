import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';

import { GithubAuthService } from '../services/github-auth.service';
import { TokenBase, TokenGenerator } from 'ts-token-generator';
import { UserDataInterface } from '../../../interfaces/user-data.interface';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly authService: GithubAuthService) {
    super({
      callbackURL: `${process.env.APP_URL}/api/github/callback`,
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: [
        'admin:gpg_key',
        'admin:org',
        'admin:org_hook',
        'admin:public_key',
        'admin:repo_hook',
        'read:packages',
        'repo',
        'user'
      ]
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        const token = new TokenGenerator({ bitSize: 512, baseEncoding: TokenBase.BASE62 });
        const userOrganizations = await this.authService.getUserOrganizations(accessToken);
        const res = userOrganizations.find(userOrg => userOrg.login === this.authService.userAuthOrganization);

        if (!res) {
          const user = { token: '' };
          done(null, user);
        }

        const userStatus = await this.authService.getUserOrgStatus(res.login, profile._json.login, accessToken);

        const user: UserDataInterface = {
          login: profile._json.login,
          role: userStatus,
          accessToken: accessToken,
          authToken: token.generate(),
          expiresTime: Date.now() + (3600 * 5 * 1000)
        };

        await this.authService.saveLoggedInUser(user);

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    });
  }
}
