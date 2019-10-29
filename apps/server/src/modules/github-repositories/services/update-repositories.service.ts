import { HttpService, Injectable } from '@nestjs/common';
import { assign, pick, keys } from 'lodash';
import { LayerService } from './layer.service';
import { PackagesService } from './packages.service';
import { GithubRepositoryInterface } from '../../../interfaces/github-repository.interface';

const config = require('../../../configs/config.json');

@Injectable()

export class UpdateRepositoriesService {

  constructor(
    private readonly httpService: HttpService,
    private readonly packagesService: PackagesService,
    private readonly repositoryLayer: LayerService
  ) {  }

  private async getPackagesNames(organizationName: string): Promise<Object[]> {
    let packages = await this.packagesService.getPackages({
      organization: organizationName,
      dataSource: 'github'
    });

    return Array.from(packages, singlePackage => singlePackage.name);
  }

  private getTypeOfPrivacyAndReposNames(repositories: Object[]): Object[] {
    return Array.from(repositories, repository =>
      assign(
      {},
      {
        repoName: repository['full_name'],
        repoType: repository['private'] ? 'Private' : 'Public'
      })
    );
  }

  public async getOrgRepositories() {
    const organizations = await this.repositoryLayer.getOrganizations('github');

    for (let org of organizations) {
      const url = `https://api.github.com/orgs/${org.organizationName}/repos?per_page=150`;
      const headOptions = {
        headers: {
          authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      };

      const { data } = await this.httpService.get(url, headOptions).toPromise();
      const repos = this.getTypeOfPrivacyAndReposNames(data);

      await this.getRepositoryPackageJson(repos, org.organizationName);
    }
  }

  private async getRepositoryPackageJson(repositories, organizationName: string) {
    let packages = await this.getPackagesNames(organizationName);

    for (let repository of repositories) {
      const master = await this.getDataFromGithub(
        repository.repoName,
        'master',
        packages);

      const development = await this.getDataFromGithub(
        repository.repoName,
        'development',
        packages);

      const newRepository: GithubRepositoryInterface = assign(repository, {
        organization: organizationName,
        dataSource: 'github',
        timestamp: Date.now(),
        branches: { master, development }
      });

      await this.repositoryLayer.updateRepositoryData(newRepository);
    }
    console.log('GitHub data updated');
  }

  private async getDataFromGithub(
    repositoryName: string,
    branchAlias: string,
    packages: any
  ) {
    let result = {};

    const headsOptions = {
      headers: {
        authorization: `token ${process.env.ACCESS_TOKEN}`
      }
    };

    for (let branchName of config.ALIASES_OF_BRANCH[branchAlias]) {
      const url = `https://raw.githubusercontent.com/${repositoryName}/${branchName}/package.json`;
       await this.httpService.get(url, headsOptions)
        .toPromise()
        .then((res: any) => {
          const { data } = res;
          const dependencies = assign(
            data,
            data.dependencies,
            data.devDependencies
          );
          result = pick(dependencies, packages);
        })
        .catch(err => {
          if (err.response.status !== 404) {
            console.error(err);
          }
        });
    }

    if (keys(result).length === 0) {
      return undefined;
    }

    return result;
  }
}
