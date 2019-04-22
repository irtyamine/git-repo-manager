import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { HttpService } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as short from 'short-uuid';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private http: HttpService, private auth: AuthService) {
    super({
      callbackURL: `${process.env.URL}/repositories2/github/callback`,
      clientID: process.env.GITHUB_CLIENT_ID || '1',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '1',
      scope: [
        'user',
        'repo',
        'read:org'
      ]
    }, (accessToken, refreshToken, profile, done)  => {
      try {
        const jwt: string = short.generate();
        this.auth.insertNewUserAccessData(Date.now() + 18000000, accessToken, jwt);
        this.auth.getUserListOfOrganizations(accessToken).subscribe(res => {
          const result = res.data.filter(organization =>
             organization.login === process.env.ACCESS_GITHUB_ORGANIZATION
          );
          let organizationName = '';
          if (!result) {
            organizationName = '';
          } else {
            organizationName = result[0].login;
          }
          const user = {
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
