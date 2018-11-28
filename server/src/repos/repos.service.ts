import { HttpService, Injectable } from '@nestjs/common';
import { assign, pick, flatMap } from 'lodash';
import { GitHubRepositoriesRepository } from './repos.repository';
import { Repos } from './interfaces/repo.object.interface';
import gitHubConfig from '../../../helpers/github.repositories';

@Injectable()
export class GitHubRepositoriesService {
  constructor(private readonly httpService: HttpService, private readonly repoDB: GitHubRepositoriesRepository) {}

  public async getRepositories() {
      return await this.makeRequestToGitHubLink(gitHubConfig.repositories);
  }

  private async makeRequestToGitHubLink(repositories) {
      const arrayOfRepos = flatMap(repositories,
        (repoData): Repos => {
              return {
              repoType: repoData.repoType,
              repoName: repoData.name,
              aliases: gitHubConfig.aliases,
              token: repoData.token
            };
          });

      for (let repo of arrayOfRepos) {
        const { repoType, repoName, aliases, token } = repo;
        for (let alias of aliases) {
          const branchName = alias[0];
          for (let branch of alias) {
            const link = `https://raw.githubusercontent.com/${repoName}/${branch}/package.json`;
              try {
                const githubData = await this.getRepositoryData(link, token);
                const repositoryObject = {
                  repoName,
                  timestamp: Date.now(),
                  repoType,
                  [branchName]: githubData
                };
                  await this.repoDB.insertToDB(repositoryObject);
                break;
              } catch (error) {
                  if (error.response.status !== 404) {
                      console.log(`${error.message}:  ${error.cause}`);
                  }
              }
            }
          }
      }
      return await this.repoDB.findRepositoriesData();
  }

  private async getRepositoryData(route: string, accessToken?: string) {
      const config = {
        headers: {
          Authorization: accessToken,
        },
      };
      const { data: packageJsonData } = await this.httpService.get(route, config).toPromise();

      const dependencies = assign({}, packageJsonData.devDependencies, packageJsonData.dependencies);

      const staticRepoData = pick(packageJsonData, [
          gitHubConfig.staticRepoData.version,
          gitHubConfig.staticRepoData.name,
          gitHubConfig.staticRepoData.description,
      ]);

      const dependenciesRepo = pick(dependencies, [
          gitHubConfig.objectPackages.express,
          gitHubConfig.objectPackages.lodash,
          gitHubConfig.objectPackages.tslint,
          gitHubConfig.objectPackages.typescript,
          gitHubConfig.objectPackages.angular,
      ]);

      return assign({}, staticRepoData, dependenciesRepo);
  }

  public findAllDataAtDatabase() {
      return this.repoDB.findRepositoriesData();
  }
}
