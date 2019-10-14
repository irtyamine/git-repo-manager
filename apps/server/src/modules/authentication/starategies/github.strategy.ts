import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      callbackURL: 'http://localhost:3000/api/github/callback',
      clientID: 'a2fff62d29c54521ee2d',
      clientSecret: 'fa89307f92618e32e2a1e7b702b887f2e55b4eb3',
      scope: [
        'user',
        'repo',
        'read:org'
      ]
    }, (accessToken, refreshToken, profile, done) => {
      try {
        console.log(accessToken);
      } catch (error) {
        done(error, false);
      }
    });
  }
}
