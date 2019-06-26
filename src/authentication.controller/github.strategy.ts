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
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: [
        'user',
        'repo',
        'read:org'
      ]
    }, (accessToken, refreshToken, profile, done)  => {
      try {
        const jwt: string = short.generate();
        this.auth.getUserListOfOrganizations(accessToken).subscribe(res => {
          const result = res.data.filter(organization =>
             organization.login === process.env.ACCESS_GITHUB_ORGANIZATION
          );
        this.auth.getUserOrgStatus(profile._json.login, accessToken)
            .subscribe(res => {
              const userStatus = res.data.role;
              const userLogin = res.data.user.login;
              let organizationName = '';
              if (!result) {
                organizationName = '';
              } else {
                organizationName = result[0].login;
                this.auth.insertNewUserAccessData(Date.now() + 18000000, userLogin, userStatus, accessToken, jwt);
              }
              const user = {
                organizationName,
                jwt
              };
              done(null, user);
            });

        }, err => {
          if(err.name === 'TimeoutError') {
            const user = {
                organizationName: '',
                jwt: ''
            };
            done(null, user);
          }
        });
      } catch (err) {
        done(err, false);
      }
    });
  }
}
