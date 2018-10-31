import { HttpService, Injectable } from '@nestjs/common';
import { assign, map, reduce } from 'lodash';
import repoConfig from '../common/github.repos/parameters/repo-data-config';
import { ReposDbService } from './repos.db.service';

@Injectable()
export class GithubReposService {
  constructor(
    private readonly httpService: HttpService,
    private readonly repoDB: ReposDbService,
  ) {}

  private getCurrentDate(date) {
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

  private async getPublicRepoData(route: string) {
    try {
      const result = await this.httpService.get(route).toPromise();
      const packageJsonData = result.data;

      const dependencies = assign({}, packageJsonData.devDependencies, packageJsonData.dependencies,);

      const staticRepoData = reduce(
        repoConfig.staticRepoData, (result, filedName) => {
          result[filedName] = packageJsonData[filedName];
          return result;
        },
        {},
      );

      const dependenciesRepo = reduce(
        repoConfig.objectPackages, (result, packageName) => {
          if (dependencies[packageName]) {
            result[packageName] = dependencies[packageName];
          }
          return result;
        },
        {},
      );

      return assign({}, staticRepoData, dependenciesRepo);
    } catch (err) {
      if (err.response.data === '404: Not Found\n') {
        return {};
      }
    }
  }

  private async getPrivateRepoData(route: string) {
    try {
      const config = {
        headers: {
          Authorization: 'token c766fecc43beb84f84bff8050ed24778057467c5',
        },
      };

      const result = await this.httpService.get(route, config).toPromise();
      const packageJsonData = result.data;

      const dependencies = assign(
        {},
        packageJsonData.devDependencies,
        packageJsonData.dependencies,
      );

      const staticRepoData = reduce(
        repoConfig.staticRepoData, (result, fieldName) => {
          result[fieldName] = packageJsonData[fieldName];
          return result;
        },
        {},
      );

      const dependenciesRepo = reduce(
        repoConfig.objectPackages, (result, packageName) => {
          if (dependencies[packageName]) {
            result[packageName] = dependencies[packageName];
          }
          return result;
        },
        {},
      );

      return assign({}, staticRepoData, dependenciesRepo);
    } catch (err) {
      if (err.response.data === '404: Not Found\n') {
        return {};
      }
    }
  }

  public async getRepo() {
    /*FOR PUBLIC REPOSITORIES*/
    const newPublicRepoData = map(
      repoConfig.repositories,
      async publuicRepo => {
        const objectOfPublicData = await reduce(
          repoConfig.branches,
          async (result, branch) => {
            const fullPublicDataResult = await result;
            fullPublicDataResult[branch] = await this.getPublicRepoData(
              `https://raw.githubusercontent.com/${publuicRepo}/${branch}/package.json`,
            );
            return fullPublicDataResult;
          },
          {},
        );
        return await assign(
          { repoName: publuicRepo, timestamp: this.getCurrentDate(new Date()) },
          objectOfPublicData,
        );
      },
    );

    const intermediatePublicRepositoriesResult = await Promise.all(
      newPublicRepoData,
    );
    const publicResult = intermediatePublicRepositoriesResult.map(
      publicData => {
        return this.create(publicData);
      },
    );
    const publicRepositories = await Promise.all(publicResult);

    /*FOR PRIVATE REPOSITORIES*/
    const newPrivateRepoData = map(
      repoConfig.privateRepositories,
      async privateRepo => {
        const objectOfPrivateData = await reduce(
          repoConfig.branches,
          async (result, branch) => {
            const fullPrivateDataResult = await result;
            fullPrivateDataResult[branch] = await this.getPrivateRepoData(
              `https://raw.githubusercontent.com/${privateRepo}/${branch}/package.json`,
            );
            return fullPrivateDataResult;
          },
          {},
        );
        return await assign(
          { repoName: privateRepo, timestamp: this.getCurrentDate(new Date()) },
          objectOfPrivateData,
        );
      },
    );

    const intermediatePrivateRepositoriesResult = await Promise.all(
      newPrivateRepoData,
    );
    const privateResult = intermediatePrivateRepositoriesResult.map(
      privateData => {
        return this.create(privateData);
      },
    );
    const privateRepositories = await Promise.all(privateResult);

    return await { publicRepositories, privateRepositories };
  }

  private async create(repoObject) {
    return await this.repoDB.insertToDB(repoObject);
  }
}
