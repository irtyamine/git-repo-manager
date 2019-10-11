import { Injectable } from '@nestjs/common';
import { LayerService } from './layer.service';
import { AuthInterface } from '../../../interfaces/auth.interface';

@Injectable()
export class GithubAuthService {

  constructor(private readonly layer: LayerService) {  }

  public async checkForOrganization(authData: AuthInterface) {
    return await this.layer.getOrgData(authData);
  }
}
