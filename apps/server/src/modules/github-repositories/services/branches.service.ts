import { Injectable } from '@nestjs/common';
import { LayerService } from './layer.service';
import { HttpService } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { CBReqBodyInterface } from '../../../interfaces/cb-req-body.interface';
import { CustomBranchesInterface } from '../../../interfaces/custom-branches.interface';
import { assign, pick } from 'lodash';

@Injectable()
export class BranchesService {

  constructor(
    private readonly layerService: LayerService,
    private readonly packagesService: PackagesService,
    private readonly http: HttpService
  ) {  }

  public async getUserBranches(repoName: string, authToken: string) {
    const userAccessToken = await this.layerService.getUserAccessToken(authToken);

    const headsOptions = {
      headers: {
        access_token: `${process.env.ACCESS_TOKEN}`
      }
    };

    const url = `https://api.github.com/repos/${repoName}/branches?access_token=${process.env.ACCESS_TOKEN}`;

    const { data } = await this.http.get(url)
      .toPromise();

    return data.map(branch => branch.name);
  }

  public async getCustomBranchesByUserName(
    query: {
      repoName: string,
      organization: string,
      addedBy: string,
      vcs: string
    }) {
    return await this.layerService.getAllCustomBranches(query)
  }

  public async setCustomBranchesData(body: CBReqBodyInterface) {
    const newCustomBranches: CustomBranchesInterface = {
      repoName: body.repoName,
      addedBy: body.userName,
      organization: body.organization,
      vcs: 'github',
      branches: {
        [ body.baseBranch ]: await this.getCustomBranchesData(body.repoName, body.organization, body.baseBranch),
        [ body.compareBranch ]: await this.getCustomBranchesData(body.repoName, body.organization, body.compareBranch)
      }
    };

    return await this.layerService.setCustomBranches(newCustomBranches);
  }

  private async getCustomBranchesData(repositoryName: string, orgName: string, branchName: string) {
    const packages = await this.packagesService
      .getPackages({ organization: orgName, dataSource: 'github' })
      .then(res => {
        return res.map(pkg => pkg.name)
      });

    const headsOptions = {
      headers: {
        authorization: `token ${process.env.ACCESS_TOKEN}`
      }
    };

    const url = `https://raw.githubusercontent.com/${repositoryName}/${branchName}/package.json`;

    return await this.http.get(url, headsOptions)
      .toPromise()
      .then(res => {
        const { data } = res;
        const dependencies = assign(
          data,
          data.dependencies,
          data.devDependencies
        );

        return pick(dependencies, packages)
      });
  }
}
