import { HttpService, Injectable } from '@nestjs/common';
import { assign, pick, keys } from 'lodash';
import { GitHubRepositoriesRepository } from './repositories.repository';
import { RepoBranchesDataObjectInterface } from './interfaces/repo-branches-data.object.interface';
import { Repo } from './interfaces/repo.interface';
let configFile = require('../../config/github-repositories-config.json');
import { CronJob } from 'cron';
import { GithubRepository } from '../app.authentication/github.repository';

@Injectable()
export class GitHubRepositoriesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly repoDB: GitHubRepositoriesRepository,
    private readonly githubUser: GithubRepository
  ) {
    this.updateTimeMorning();
    this.updateTimeEvening();
  }

  private updateTimeMorning() {
    this.repoDB.deleteFromDb();
    new CronJob('00 00 09 * * 1-5', () => {
      this.makeRequestToGitHubLink();
    }, null, true, 'Europe/Kiev');
  }

  private getRepositoriesNamesFromGit(accessToken) {
    this.httpService.get(`https://api.github.com/orgs/valor-software/repos?access_token=${accessToken}&per_page=150`)
      .subscribe(repositories => {
        for(let repository of repositories.data) {
          const initialRepositoriesObject = {
            repoName: repository.full_name,
            reposNamesUpdateTime: Date.now(),
            repoType: !repository.private ? 'Public' : 'Private'
          };
          this.repoDB.firsInsertToDB(
            initialRepositoriesObject,
            initialRepositoriesObject.repoName
          );
          console.log('Repositories names updated');
        }
      });
  }

  private updateTimeEvening() {
    new CronJob('00 00 19 * * 1-5', () => {
      this.makeRequestToGitHubLink();
    }, null, true, 'Europe/Kiev');
  }

  public async getNamesFromDB(authToken) {
    this.repoDB.deleteFromDb();
    const updateReposNamesTime = await this.repoDB.getReposNamesUpdateTime(),
      githubAccessToken = await this.githubUser.getAuthToken(authToken),
      milliseconds = Date.now() - updateReposNamesTime.reposNamesUpdateTime,
      hours = Math.floor(milliseconds / (1000 * 60 * 60));

    if (hours >= 24) {
      this.getRepositoriesNamesFromGit(githubAccessToken.accessToken);
      return await this.repoDB.findRepositoriesNames();
    } else {
      return await this.repoDB.findRepositoriesNames();
    }
  }

  private async makeRequestToGitHubLink() {
    const data = await this.repoDB.getRepositoryNameAndTypeToUpdate();
    for (let repository of data) {
      const branch = {},
        masterSearch = await this.createGithubLinkAndGetDataFromGitHub(
          repository,
          {},
          branch,
          'master'
        ),
        developmentSearch = await this.createGithubLinkAndGetDataFromGitHub(
          repository,
          {},
          branch,
          'development'
        ),
        repositoryData = assign({}, masterSearch, developmentSearch);
      this.repoDB.insertToDB(repositoryData);
      console.log('Updated');
    }
  }

  private async createGithubLinkAndGetDataFromGitHub(repositoryData, dataObject, branchObject, branchAlias) {
    for (let branch of configFile.ALIASES_OF_BRANCH[branchAlias]) {

      const link = `https://raw.githubusercontent.com/${repositoryData.repoName}/${branch}/package.json`,
        gitHubData = await this.getRepositoryDataFromGithub(link, configFile.ACCESS_TOKEN);
      if (keys(gitHubData).length === 0) break;

      const branches: RepoBranchesDataObjectInterface = { [branchAlias]: gitHubData };
      assign(branchObject, branches);

      const repository: Repo = {
        repoName: repositoryData.repoName,
        repoType: repositoryData.repoType,
        timestamp: Date.now(),
        branches: branchObject
      };
      assign(dataObject, repository);
    }

    return dataObject;
  }

  private async getRepositoryDataFromGithub(route: string, accessToken: string) {
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
        const resultObjectDependencies = assign(
          {},
          result.data.devDependencies,
          result.data.dependencies
        ),
          staticRepoData = pick(
            result.data,
            configFile.DEPENDENCIES
          ),
          dependenciesRepo = pick(
          resultObjectDependencies,
          configFile.DEV_DEPENDENCIES
        );

        assign(resultData, staticRepoData, dependenciesRepo);
      })
      .catch(error => {
        if (error.response.status === 404) {
          return null;
        } else if (error.respose.status === 400) {
          return null;
        }
        else {
          throw error;
        }
      });
     return resultData;
  }

  public findRepoDataAtDatabase(parameter) {
    return this.repoDB.findRepositoryData(parameter);
  }
}
