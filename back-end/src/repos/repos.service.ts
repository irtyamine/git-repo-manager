import { HttpService, Injectable } from '@nestjs/common';
import { assign, map, pick, flatMap } from 'lodash';
import repoConfig from '../../config/repo-data-config';
import { ReposRepository } from './repos.repository';

@Injectable()
export class ReposService {
  constructor(private readonly httpService: HttpService, private readonly repoDB: ReposRepository) {}

  public async getRepo() {
    const publicRepositories = await this.makeRequestToGitHubLink(repoConfig.repositories);
    return publicRepositories;
  }

  private async makeRequestToGitHubLink(repositories) {
      interface Repos {
        link: string;
        repoType: string;
        repoName: string;
        branch: string;
        token: string;
      }

      const arrayOfRepos: Repos[] = flatMap(repositories,
        (repoData): Repos[] => {
          return map(repoConfig.branches, (branch: string) => {
              return {
              link: `https://raw.githubusercontent.com/${repoData.name}/${branch}/package.json`,
              repoType: repoData._privacy,
              repoName: repoData.name,
              branch: branch,
              token: repoData.token
            };
          });
        },
      );

          for (let repo of arrayOfRepos) {
              const {link, repoType, repoName, branch, token} = repo;
              const githubData = await this.getReposData(link, token);

              if (githubData !== undefined) {
                  const newObject = assign({}, {
                      repoName,
                      timestamp: new Date(),
                      repoType,
                      [branch]: githubData
                  });
                  await this.repoDB.insertToDB(newObject);
              }
          }
    return await this.repoDB.findReposData();
  }

  private async getReposData(route: string, accessToken?: string) {
    try {
      const config = {
        headers: {
          Authorization: accessToken,
        },
      };
      const { data: packageJsonData } = await this.httpService.get(route, config).toPromise();

      const dependencies = assign({}, packageJsonData.devDependencies, packageJsonData.dependencies);

      const staticRepoData = pick(packageJsonData, [
        repoConfig.staticRepoData.version,
        repoConfig.staticRepoData.name,
        repoConfig.staticRepoData.description,
      ]);

      const dependenciesRepo = pick(dependencies, [
        repoConfig.objectPackages.express,
        repoConfig.objectPackages.lodash,
        repoConfig.objectPackages.tslint,
        repoConfig.objectPackages.typescript,
        repoConfig.objectPackages.angular,
      ]);

      return assign({}, staticRepoData, dependenciesRepo);
    } catch (err) {
      if (err.response.data === 'Not found\n') {
        return { data: 'Nothing data' };
      }
    }
  }
}
