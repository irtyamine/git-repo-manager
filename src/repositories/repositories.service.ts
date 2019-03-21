import { HttpService, Injectable } from '@nestjs/common';
import { assign, pick, keys } from 'lodash';
import { GitHubRepositoriesRepository } from './repositories.repository';
import { RepoBranchesDataObjectInterface } from './interfaces/repo-branches-data.object.interface';
import { Repo } from './interfaces/repo.interface';
let configFile = require('../../config/github-repositories-config.json');
import { CronJob } from 'cron';

@Injectable()
export class GitHubRepositoriesService {

  constructor(
    private readonly httpService: HttpService,
    private readonly repoDB: GitHubRepositoriesRepository,
  ) {
    this.updateTimeMorning();
    this.updateTimeEvening();
  }

  public updateTimeMorning() {
    new CronJob('00 00 9 * * 1-5', () => {
      this.makeRequestToGitHubLink();
    }, null, true, 'Europe/Kiev');
  }

  public updateTimeEvening() {
    new CronJob('00 00 19 * * 1-5', () => {
      this.makeRequestToGitHubLink();
    }, null, true, 'Europe/Kiev');
  }

  public getNamesFromDB() {
    for (let repository of configFile.repositories) {
      const initialRepositoriesObject = {
        repoName: repository.name,
        repoType: repository.repoType
      };
      this.repoDB.firsInsertToDB(initialRepositoriesObject, initialRepositoriesObject.repoName);
    }
    return this.repoDB.findRepositoriesNames();
  }

  private async makeRequestToGitHubLink() {
    for (let repository of configFile.repositories) {
      const branch = {},
        masterSearch = await  this.createGithubLinkAndGetDataFromGitHub(repository, {}, branch, 'master'),
        developmentSearch = await this.createGithubLinkAndGetDataFromGitHub(repository, {}, branch, 'development'),
        repositoryData = assign({}, masterSearch, developmentSearch);
      this.repoDB.insertToDB(repositoryData);
      console.log('Updated');
    }
  }

  private async createGithubLinkAndGetDataFromGitHub(repositoryData, dataObject, branchObject, branchAlias) {
    for (let branch of configFile.aliasesOfBranch[branchAlias]) {

      const link = `https://raw.githubusercontent.com/${repositoryData.name}/${branch}/package.json`,
        gitHubData = await this.getRepositoryData(link, repositoryData.token);
      if (keys(gitHubData).length === 0) break;

      const branches: RepoBranchesDataObjectInterface = { [branchAlias]: gitHubData };
      assign(branchObject, branches);

      const repository: Repo = {
        repoName: repositoryData.name,
        repoType: repositoryData.repoType,
        timestamp: Date.now(),
        branches: branchObject
      };
      assign(dataObject, repository);
    }

    return dataObject;
  }

  private async getRepositoryData(route: string, accessToken: string) {
    const config = {
      headers: {
        Authorization: accessToken
      }
    };

    const resultData = {};
    await this.httpService
      .get(route, config)
      .toPromise()
      .then( result => {
        const dependencies = assign(
          {},
          result.data.devDependencies,
          result.data.dependencies
        );

        const staticRepoData = pick(result.data, [
          configFile.dependencies.version,
          configFile.dependencies.name,
          configFile.dependencies.description
        ]);

        const dependenciesRepo = pick(dependencies, [
          configFile.devDependencies.express,
          configFile.devDependencies.lodash,
          configFile.devDependencies.tslint,
          configFile.devDependencies.typescript,
          configFile.devDependencies.angular
        ]);
        assign(resultData, staticRepoData, dependenciesRepo);
      })
      .catch(error => {
        if (error.response.status === 404) {
          return null;
        }
        else {
          throw error;
        }
      });
     return resultData;
  }

  public findAllDataAtDatabase(parameter) {
    return this.repoDB.findRepositoriesData(parameter);
  }
}
