import { Injectable } from '@nestjs/common';
import { LayerService } from './layer.service';
import { AuthInterface } from '../../../interfaces/auth.interface';

import { HttpService } from '@nestjs/common';

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

  public async getOrganizations() {
    return await this.layer.getOrganizations();
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
