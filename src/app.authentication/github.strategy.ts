import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { HttpService } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as short from 'short-uuid';
const authKeys = require('../../config/auth.keys.json');

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private http: HttpService, private auth: AuthService) {
    super({
      callbackURL: 'http://cf83561e.ngrok.io/repositories2/github/callback',
      clientID: authKeys.strategies.github.GITHUB_CLIENT_ID,
      clientSecret: authKeys.strategies.github.GITHUB_CLIENT_SECRET,
      scope: [
        'user',
        'repo',
        'read:org'
      ]
    }, (accessToken, refreshToken, profile, done)  => {
      try {
        const jwt: string = short.generate();
        this.auth.insertNewUserAccessData(Date.now() + 180000, accessToken, jwt);
        this.auth.getUserListOfOrganizations(accessToken).subscribe(res => {
          const result = res.data.filter(organization =>
             organization.login === authKeys.organizations.ACCESS_GITHUB_ORGANIZATION
          ),
            organizationName = result[0].login,
            user = {
              organizationName,
              jwt
            };
          done(null, user);
        });
      } catch (err) {
        done(err, false);
      }
    });
  }
}