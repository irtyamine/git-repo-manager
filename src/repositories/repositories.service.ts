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
    private readonly githubUser: GithubRepository,
  ) {
    this.updateTimeMorning();
    this.updateTimeEvening();
  }

  private updateTimeMorning() {
    new CronJob('00 00 09 * * 1-5', () => {
      this.makeRequestToGitHubLink();
    }, null, true, 'Europe/Kiev');
  }

  private getRepositoriesNamesFromGit(accessToken) {
    return this.httpService.get(`https://api.github.com/orgs/valor-software/repos?access_token=${accessToken}&per_page=150`)
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
        }
      });
  }

  private updateTimeEvening() {
    new CronJob('00 00 19 * * 1-5', () => {
      this.makeRequestToGitHubLink();
    }, null, true, 'Europe/Kiev');
  }

  public async getNamesFromDB(authToken) {
    const updateReposNamesTime = await this.repoDB.getReposNamesUpdateTime();
    let time: number;
    !updateReposNamesTime ? time = 0 : time = updateReposNamesTime.reposNamesUpdateTime;

    const milliseconds = Date.now() - time,
      hours = Math.floor(milliseconds / (1000 * 60 * 60)),
      githubAccessToken = await this.githubUser.getAccessToken(authToken);

    if (hours >= 24) {
      this.getRepositoriesNamesFromGit(githubAccessToken.accessToken);
      setTimeout(() => {
        this.makeRequestToGitHubLink();
      }, 3000);
      let reposNames = await this.repoDB.findRepositoriesNames();
      return reposNames.map(item => item.repoName);
    } else {
      let reposNames = await this.repoDB.findRepositoriesNames();
      return reposNames.map(item => item.repoName);
    }
  }

  private async makeRequestToGitHubLink() {
    const repositories = await this.repoDB.getRepositoryNameAndTypeToUpdate();
    for (let repository of repositories) {
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
    }
  }

  private async createGithubLinkAndGetDataFromGitHub(repositoryData, dataObject, branchObject, branchAlias) {
    for (let branch of configFile.ALIASES_OF_BRANCH[branchAlias]) {

      const link = `https://raw.githubusercontent.com/${repositoryData.repoName}/${branch}/package.json`,
        gitHubData = await this.getRepositoryDataFromGithub(link, process.env.ACCESS_TOKEN);
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
        } else if (error.response.status === 400) {
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
