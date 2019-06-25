import { HttpService, Injectable, RequestTimeoutException } from '@nestjs/common';
import { assign, pick, keys } from 'lodash';
import { GitHubRepositoriesRepositoryLayer } from '../repository-layer';
import { RepoBranchesDataObjectInterface } from '../interfaces/repo-branches-data.object.interface';
import { Repo } from '../interfaces/repo.interface';
import { catchError, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { PackagesRepositoryLayer } from '../../packages.controller/repository-layer';
import { GithubRepositoryLayer } from '../../authentication.controller/repository-layer';
const configFile = require('../../../github-repositories-config.json');

@Injectable()
export class GitHubRepositoriesService {
  private packages: any = [];

  constructor(
    private readonly httpService: HttpService,
    private readonly repoDB: GitHubRepositoriesRepositoryLayer,
    private giHubLayer: GithubRepositoryLayer,
    private packagesService: PackagesRepositoryLayer
  ) {}

  private async getPackagesNames() {
    this.packages.length = 0;
    const data = await this.packagesService.getPackagesNames();
    for(let pkg of data) {
      this.packages.push(pkg.name);
    }
  }

  private async getRepositoryData(repositoryName: string, accessToken: string) {
    const url = `https://api.github.com/repos/${repositoryName}?access_token=${accessToken}`;
    let data = '';
    await this.httpService.get(url)
        .toPromise()
        .then(res => {
          data = res.data.private ? 'Private' : 'Public';
        });
    return data;
  }

  public async updateSingleRepository(repositoryName: string, branches: any, authToken: string) {
    await this.getPackagesNames();
    const dataObject = {};
    const accessToken = await this.giHubLayer.getAccessToken(authToken);
    const repoData = await this.getRepositoryData(repositoryName, accessToken.accessToken);

    for (let branch of branches) {
      const url = `https://raw.githubusercontent.com/${repositoryName}/${branch}/package.json`,
          githubData = await this.getRepositoryDataFromGithub(url, `token ${process.env.ACCESS_TOKEN}`);

      const branches: RepoBranchesDataObjectInterface = { [branch]: githubData };
      assign(dataObject, branches);
    }

    const newRepositoryData = {
      repoName: repositoryName,
      repoType: repoData,
      timestamp: Date.now(),
      addedBy: accessToken.userLogin,
      branches: dataObject
    };

    await this.repoDB.updateSingleRepository(newRepositoryData);
    return await this.repoDB.getAllRepos(accessToken.userLogin);
  }

  public async setRepoBranchesToDefault(repositoryName: string, authToken) {
      const accessToken = await this.giHubLayer.getAccessToken(authToken);

      this.repoDB.setBranchesToDefault(repositoryName, accessToken.userLogin);
      return await this.repoDB.getAllRepos(accessToken.userLogin);
  }

  public async getBranchesByProject(repoName: string, authToken: string) {
    const accessToken = await this.giHubLayer.getAccessToken(authToken);
    const url = `https://api.github.com/repos/${repoName}/branches?access_token=${accessToken.accessToken}`;

    const branchesData = await this.httpService.get(url).toPromise();
    const branches = ['default'];
    branchesData.data.forEach(branch => {
      branches.push(branch.name);
    });
    return branches;
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
        .subscribe(async repositories => {
          for(let repository of repositories.data) {
            const initialRepositoriesObject = {
              repoName: repository.full_name,
              repoType: !repository.private ? 'Public' : 'Private'
            };
            await this.repoDB.insertReposNamesToDB(
                initialRepositoriesObject,
                initialRepositoriesObject.repoName
            );
          }
          await this.makeRequestToGitHubLink();
        }, err => {
          if(err.name === 'TimeoutError') {
            console.error('Error: Get repos data from Github API timed out');
            return null;
          }
        });
  }

  public async findRepositoryDataAtDatabase(repoName: string, authToken: string) {
    const accessToken = await this.giHubLayer.getAccessToken(authToken);
    return await this.repoDB.findRepositoryData(repoName, accessToken.userLogin);
  }

  private async makeRequestToGitHubLink() {
    const repositories = await this.repoDB.getRepositoryNameAndTypeToUpdate();
    for (let repository of repositories) {
      const branch = {};
      const masterSearch = await this.createGithubLinkAndGetDataFromGitHub(
        repository,
        {},
        branch,
        'master'
      );
      const developmentSearch = await this.createGithubLinkAndGetDataFromGitHub(
        repository,
        {},
        branch,
        'development'
      );
      const repositoryData = assign({}, masterSearch, developmentSearch);
      await this.repoDB.insertSingleRepositoryToDB(repositoryData);
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
        addedBy: 'system',
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
