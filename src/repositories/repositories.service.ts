import { HttpService, Injectable } from '@nestjs/common';
import { assign, pick, keys } from 'lodash';
import { GitHubRepositoriesRepository } from './repositories.repository';
import { RepoBranchesDataObjectInterface } from './interfaces/repo-branches-data.object.interface';
import { Repo } from './interfaces/repo.interface';
import { ConfigService } from '../../config/config.service';
import { CronJob } from 'cron';

@Injectable()
export class GitHubRepositoriesService {

  constructor(
    private readonly httpService: HttpService,
    private readonly repoDB: GitHubRepositoriesRepository,
    private readonly configFile: ConfigService
  ) {
    this.updateTime();
  }

  public updateTime() {
    new CronJob('00 00 11 * * 1-5', () => {
      this.makeRequestToGitHubLink();
    }, null, true, 'Europe/Kiev');
  }

  public getNamesFromDB() {
    let arrayOfRepositoriesNames = [];
    for (let repository of this.configFile.config.repositories) {
      const initialRepositoriesObject = {
        repoName: repository.name,
        repoType: repository.repoType
      };
      arrayOfRepositoriesNames.push(initialRepositoriesObject);
      this.repoDB.firsInsertToDB(initialRepositoriesObject, initialRepositoriesObject.repoName);
    }
    return arrayOfRepositoriesNames;
  }

  private async makeRequestToGitHubLink() {
    for (let repository of this.configFile.config.repositories) {
      const branch = {},
        masterSearch = await  this.createGithubLinkAndGetDataFromGitHub(repository, {}, branch, 'master'),
        developmentSearch = await this.createGithubLinkAndGetDataFromGitHub(repository, {}, branch, 'development'),
        repositoryData = assign({}, masterSearch, developmentSearch);
      this.repoDB.insertToDB(repositoryData);
      this.countUpdatedRepositories(this.configFile.config.repositories.indexOf(repository) + 1);
    }
  }

  private countUpdatedRepositories(count) {
    console.log(count);
  }

  private async createGithubLinkAndGetDataFromGitHub(repositoryData, dataObject, branchObject, branchAlias) {
    for (let branch of this.configFile.config.aliasesOfBranch[branchAlias]) {

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
          this.configFile.config.staticRepoData.version,
          this.configFile.config.staticRepoData.name,
          this.configFile.config.staticRepoData.description
        ]);

        const dependenciesRepo = pick(dependencies, [
          this.configFile.config.objectPackages.express,
          this.configFile.config.objectPackages.lodash,
          this.configFile.config.objectPackages.tslint,
          this.configFile.config.objectPackages.typescript,
          this.configFile.config.objectPackages.angular
        ]);
        assign(resultData, staticRepoData, dependenciesRepo);
      })
      .catch(error => {
        if (error.response.status === 404) { return null; }
        else { throw error; }
      });
     return resultData;
  }

  public findAllDataAtDatabase(parameter) {
    return this.repoDB.findRepositoriesData(parameter);
  }
}
