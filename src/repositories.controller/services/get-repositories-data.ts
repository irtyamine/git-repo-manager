import { HttpService, Injectable, RequestTimeoutException } from '@nestjs/common';
import { assign, pick, keys } from 'lodash';
import { GitHubRepositoriesRepositoryLayer } from '../repository-layer';
import { RepoBranchesDataObjectInterface } from '../interfaces/repo-branches-data.object.interface';
import { Repo } from '../interfaces/repo.interface';
import { catchError, retry, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { PackagesRepositoryLayer } from '../../packages.controller/repository-layer';
const configFile = require('../../../github-repositories-config.json');

@Injectable()
export class GitHubRepositoriesService {
  private packages: any = [];

  constructor(
    private readonly httpService: HttpService,
    private readonly repoDB: GitHubRepositoriesRepositoryLayer,
    private packagesService: PackagesRepositoryLayer
  ) {  }

  private async getPackagesNames() {
    let data = await this.packagesService.getPackagesNames();
    for(let pkg of data) {
      this.packages.push(pkg.name);
    }
    console.log(this.packages);
  }

  public async getRepositoriesNamesFromDb() {
    let reposNames = await this.repoDB.findRepositoriesNames();
    return reposNames.map(item => item.repoName);
  }

  public getRepositoriesNamesFromGit(accessToken) {
    this.getPackagesNames();
    return this.httpService.get(`https://api.github.com/orgs/valor-software/repos?access_token=${accessToken}&per_page=150`)
        .pipe(
            timeout(30000),
            catchError(err => throwError(err))
        )
        .subscribe(repositories => {
          for(let repository of repositories.data) {
            const initialRepositoriesObject = {
              repoName: repository.full_name,
              reposNamesUpdateTime: Date.now(),
              repoType: !repository.private ? 'Public' : 'Private'
            };
            this.repoDB.insertReposNamesToDB(
                initialRepositoriesObject,
                initialRepositoriesObject.repoName
            );
          }
          setTimeout(() => {
            this.makeRequestToGitHubLink();
          }, 1000);
        }, err => {
          if(err.name === 'TimeoutError') {
            console.error('Error: Get repos data from Github API timed out');
            return null;
          }
        });
  }

  public findRepositoryDataAtDatabase(repoName: string) {
    return this.repoDB.findRepositoryData(repoName);
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
      this.repoDB.insertSingleRepositoryToDB(repositoryData);
    }
  }

  private async createGithubLinkAndGetDataFromGitHub(repositoryData, dataObject, branchObject, branchAlias) {
    for (let branch of configFile.ALIASES_OF_BRANCH[branchAlias]) {

      const link = `https://raw.githubusercontent.com/${repositoryData.repoName}/${branch}/package.json`,
        gitHubData = await this.getRepositoryDataFromGithub(link, `token ${process.env.ACCESS_TOKEN}`);
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
      .pipe(
          timeout(30000),
          catchError(err => throwError(err))
      )
      .toPromise()
      .then( result => {
        const resultObjectDependencies = assign(
          {},
          result.data.devDependencies,
          result.data.dependencies
        ),
          staticRepoData = pick(
            result.data,
            this.packages
          ),
          dependenciesRepo = pick(
          resultObjectDependencies,
          this.packages
        );

        assign(resultData, staticRepoData, dependenciesRepo);
      })
      .catch(error => {
        if (error.name === 'TimeoutError') {
          console.log('Error: Get repository data timed out');
          return null;
        }
        else if (error.response.status === 404) {
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
}
