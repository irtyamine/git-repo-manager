import { Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/common';
import { GithubRepositoryLayer } from './repository-layer';
import { catchError, timeout, retry } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { GithubUserInterface } from './interfases/github.user.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpService, private dbService: GithubRepositoryLayer) {}

  public insertNewUserAccessData(date: number, userLogin: string, userStatus: string, accessToken: string, authToken: string) {
    const userProfileObject: GithubUserInterface = {
      expiresDate: date,
      userLogin: userLogin,
      status: userStatus,
      accessToken: accessToken,
      authToken: authToken,
    };

    return this.dbService.insertNewUser(userProfileObject);
  }

  public async getUserLoginAndStatus(authToken: string) {
    return await this.dbService.getUsrData(authToken);
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

  public getUserOrgStatus(userLogin: string, accessToken: string) {
    return this.http.get(`https://api.github.com/orgs/valor-software/memberships/${userLogin}?access_token=${accessToken}`)
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
