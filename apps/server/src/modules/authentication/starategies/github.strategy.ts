import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';

import { GithubAuthService } from '../services/github-auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly authService: GithubAuthService) {
    super({
      callbackURL: 'http://localhost:3000/api/github/callback',
      clientID: 'a2fff62d29c54521ee2d',
      clientSecret: 'fa89307f92618e32e2a1e7b702b887f2e55b4eb3',
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
        const userOrganizations = await this.authService.getUserOrganizations(accessToken);
        const res = userOrganizations.find(userOrg => userOrg.login === this.authService.userAuthOrganization);

        if (!res) {
          const user = { token: '' };
          done(null, user);
        }

        const user = { token: accessToken };
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    });
  }
}
