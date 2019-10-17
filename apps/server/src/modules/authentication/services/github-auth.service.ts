import { Injectable } from '@nestjs/common';
import { LayerService } from './layer.service';
import { AuthInterface } from '../../../interfaces/auth.interface';

import { HttpService } from '@nestjs/common';
import { UserDataInterface } from '../../../interfaces/user-data.interface';

@Injectable()
export class GithubAuthService {

  public userAuthOrganization: string;

  constructor(
    private readonly layer: LayerService,
    private readonly http: HttpService
  ) {  }

  public async checkForOrganization(authData: AuthInterface) {
    this.userAuthOrganization = authData.organization;
    return await this.layer.getOrgData(authData);
  }

  public async saveLoggedInUser(userData: UserDataInterface) {
    return await this.layer.saveLoggedInUser(userData);
  }

  public async getUserOrgStatus(orgName: string, userLogin: string, accessToken: string) {
    const { data } = await this.http.get(`https://api.github.com/orgs/${orgName}/memberships/${userLogin}?access_token=${accessToken}`)
      .toPromise();

    return data.role;
  }

  public async getUserInfo(authToken: string) {
    return await this.layer.getUserData(authToken);
  }

  public async getUserOrganizations(accessToken: string) {
    const headsOptions = {
      headers: {
        authorization: `token ${accessToken}`
      }
    };

    const orgs = await this.http
      .get('https://api.github.com/user/orgs', headsOptions)
      .toPromise();

    return orgs.data;
  }
}
