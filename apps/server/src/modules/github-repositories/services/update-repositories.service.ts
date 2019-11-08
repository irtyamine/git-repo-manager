import { HttpService, Injectable } from '@nestjs/common';
import { assign, pick } from 'lodash';
import { LayerService } from './layer.service';
import { PackagesService } from './packages.service';

import { BranchesAliasesInterface } from '../interfaces/branches-aliases.interface';
import { GithubRepositoryInterface } from '../interfaces/github-repository.interface';
import { GithubPackagesInterface } from '../interfaces/github-packages.interface';

@Injectable()
export class UpdateRepositoriesService {

  private packages: any;
  private branches: any;

  constructor(
    private readonly http: HttpService,
    private readonly packagesService: PackagesService,
    private readonly layerService: LayerService
  ) {  }

  public async updateRepositories() {
    const organizations = await this.layerService.getOrganizations('github');

    for (let organization of organizations) {
      const url = `https://api.github.com/orgs/${organization.organizationName}/repos?per_page=150`;
      const headOptions = {
        headers: {
          authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      };

      this.packages = await this.getPackages(organization.organizationName);
      this.branches = await this.layerService.getBranchesAliases();

      await this.http.get(url, headOptions)
        .subscribe(async res => {
          const { data } = res;
          const repositories = this.getRepositoryTypeAndName(data);

          await this.setRepositoryData(repositories, organization.organizationName);
        });
    }
  }

  private getRepositoryTypeAndName(repositories: object[]) {
    return repositories.map(repository => {
      return {
        repoName: repository['full_name'],
        repoType: repository['private'] ? 'Private' : 'Public'
      }
    })
  }

  private async getPackages(organization: string) {
    return await this.packagesService
      .getPackages({
        organization: organization,
        dataSource: 'github',
      })
      .then(packages => {
        return packages.map(pkg => {
          return pkg.name
        })
      });
  }

  private async setRepositoryData(repositories: any, organization: string) {
    for (let repository of repositories) {
      const master = await this.getRepositoryDataFromGithub(
        repository.repoName,
        'master'
      );

      const development = await this.getRepositoryDataFromGithub(
        repository.repoName,
        'development'
      );

      const repositoryToUpdate: GithubRepositoryInterface = assign(
        repository, {
          organization: organization,
          dataSource: 'github',
          timestamp: Date.now(),
          branches: {
            baseBranch: master,
            compareBranch: development
          }
        });
      await this.layerService.updateRepositoryData(repositoryToUpdate);
    }
    console.log(`GitHub data updated`);
  }

  private async getRepositoryDataFromGithub(
    repositoryName: string,
    branchAlias: string
  ) {
    let result = {};

    const headsOptions = {
      headers: {
        authorization: `token ${process.env.ACCESS_TOKEN}`
      }
    };

    for (let branch of this.branches[branchAlias]) {
      const url = `https://raw.githubusercontent.com/${repositoryName}/${branch}/package.json`;
      await this.http.get(url, headsOptions)
        .toPromise()
        .then(repositoryData => {
          const { data } = repositoryData;

          const dependencies = assign(
            data,
            data.dependencies,
            data.devDependencies
          );

          result = assign(
            { branchName: branchAlias },
            pick(dependencies, this.packages)
          );
        })
        .catch(error => {
          switch (error.response.status) {
            case 404:
              return undefined;
          }
        })
    }

    return result;
  }

}
