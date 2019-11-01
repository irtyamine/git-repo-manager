import { Injectable } from '@nestjs/common';
import { LayerService } from './layer.service';
import { HttpService } from '@nestjs/common';

@Injectable()
export class BranchesService {

  constructor(
    private readonly layerService: LayerService,
    private readonly http: HttpService
  ) {  }

  public async getUserBranches(repoName: string, authToken: string) {
    const userAccessToken = await this.layerService.getUserAccessToken(authToken);

    const headsOptions = {
      headers: {
        access_token: `${userAccessToken}`
      }
    };

    const url = `https://api.github.com/repos/${repoName}/branches`;

    const { data } = await this.http.get(url, headsOptions)
      .toPromise();

    return data.map(branch => branch.name);
  }
}
