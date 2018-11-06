import { HttpService, Injectable } from '@nestjs/common';
import { assign, map, reduce, pick } from 'lodash';
import repoConfig from '../../config/repo-data-config';
import ApiKeys from '../../config/API.keys';
import { ReposRepository } from './repos.repository';

@Injectable()
export class ReposService {
  constructor(private readonly httpService: HttpService, private readonly repoDB: ReposRepository) {}

  public async getRepo() {
    const publicRepositories = await this.createRepoLink(repoConfig.repositories, null);
    const privateRepositories = await this.createRepoLink(
      repoConfig.privateRepositories,
      ApiKeys.GitHubTokens.reposAccessToken,
    );
    return await { publicRepositories, privateRepositories };
  }

  private async createObjectOfData(arrayOfBranches, branch, repo, token) {
      const fullRepoDataResult = await arrayOfBranches;
      fullRepoDataResult[branch] = await this.getReposData(
          `https://raw.githubusercontent.com/${repo}/${branch}/package.json`,
          token,
      );
      return fullRepoDataResult;
  }

  private async createRepoLink(typeOfReposPrivacy, token: string) {
    const newRepoData = map(typeOfReposPrivacy, async repo => {
      const objectOfRepoData = await reduce(
        repoConfig.branches,
        async (result, branch) => {
          return this.createObjectOfData(result, branch, repo, token);
        },
        {},
      );
      return await assign({ repoName: repo, timestamp: this.getCurrentDate(new Date()) }, objectOfRepoData);
    });

    const intermediateRepositoriesResult = await Promise.all(newRepoData);
    const repoResult = intermediateRepositoriesResult.map(publicData => {
      return this.create(publicData);
    });
    return await Promise.all(repoResult);
  }

  private async getReposData(route: string, accessToken: string) {
    try {
      const config = {
        headers: {
          Authorization: accessToken,
        },
      };
      const { data: packageJsonData } = await this.httpService.get(route, config).toPromise();
      
      const dependencies = assign({}, packageJsonData.devDependencies, packageJsonData.dependencies);

      const staticRepoData = pick(
          packageJsonData, [
          repoConfig.staticRepoData.version,
          repoConfig.staticRepoData.name,
          repoConfig.staticRepoData.description
      ]);

      const dependenciesRepo = pick(
          dependencies, [
              repoConfig.objectPackages.express,
              repoConfig.objectPackages.lodash,
              repoConfig.objectPackages.tslint,
              repoConfig.objectPackages.typescript,
              repoConfig.objectPackages.angular
          ]);

      return assign({}, staticRepoData, dependenciesRepo);
    } catch (err) {
      if (err.response.data === '404: Not Found\n') {
        return {};
      }
    }
  }

  private getCurrentDate(date: Date) {
    return (
      date.getDate() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getFullYear() +
      ' @ ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds()
    );
  }

  private async create(repoObject) {
    return await this.repoDB.insertToDB(repoObject);
  }
}
