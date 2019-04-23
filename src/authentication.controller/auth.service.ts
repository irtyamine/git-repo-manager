import { Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/common';
import { GithubRepositoryLayer } from './repository-layer';
import { catchError, timeout, retry } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { GithubUserInterface } from './interfases/github.user.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpService, private dbService: GithubRepositoryLayer) {}

  public insertNewUserAccessData(date, accessToken, authToken) {
    const userProfileObject: GithubUserInterface = {
      expiresDate: date,
      accessToken: accessToken,
      authToken: authToken,
    };

    return this.dbService.insertNewUser(userProfileObject);
  }

  public getUserListOfOrganizations(accessToken) {
    const heads = {
      'Authorization': `token ${accessToken}`
    };

    return this.http.get('https://api.github.com/user/orgs', { headers: heads })
        .pipe(
            timeout(30000),
            catchError(err => throwError(err))
        );
  }

  public async getUserPersonalAccesstoken(authToken) {
    if(!await this.dbService.getAccessToken(authToken)) {
      throw new UnauthorizedException(401);
    } else {
      return true;
    }
  }
}
