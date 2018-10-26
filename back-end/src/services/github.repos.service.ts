import { Injectable, HttpService } from '@nestjs/common';
import * as _ from 'lodash';
import repoConfig from '../parameters/repo-data-config';
import { ReposDbService } from '../repository.service/repos.db.service';

@Injectable()
export class GithubReposService {

    constructor(
        private readonly httpService: HttpService,
        private readonly repoDB: ReposDbService
    ) {  }

    async getRepoData(route) {
        try {
            const result = await this.httpService.get(route).toPromise();
            const finRes = result.data;
            const dependencies = Object.assign({}, finRes.devDependencies, finRes.dependencies);
            const staticRepoData = _.reduce(repoConfig.staticRepoData, (result, filedName) => {
                result[filedName] = finRes[filedName];
                return result;
            }, {});

            const dependenciesRepo = _.reduce(repoConfig.objectPackages, (result, packageName) => {
                if (dependencies[packageName]) {
                    result[packageName] = dependencies[packageName];
                }
                return result;
            }, {});

            const resultRepoData = _.assign({}, staticRepoData, dependenciesRepo);
            return resultRepoData;
        }
        catch (err) {
            if (err.response.data === '404: Not Found\n') {
                let errorMessage = {};
                return errorMessage;
            }
        }
    }

    async getRepo() {
        const currentDate = new Date();
        const datetime = currentDate.getDay() + "/" + (currentDate.getMonth() +1)
            + "/" + currentDate.getFullYear() + " @ "
            + currentDate.getHours() + ":"
            + currentDate.getMinutes() + ":" + currentDate.getSeconds();
        const a = await repoConfig.repositories.map(async repo => {
            const obj = await _.reduce(repoConfig.branches, async (result, branch) => {
                const syncResult = await result;
                syncResult[branch] = await this.getRepoData(`https://raw.githubusercontent.com/${repo}/${branch}/package.json`);
                return syncResult;
            }, {});
            const resultData = Object.assign({repoName: repo, timestamp: datetime}, obj);
            return await resultData
        });
        const intermediateResult = await Promise.all(a);
        const finalResult = intermediateResult.map(data => {
           return this.create(data)
        });
        return await Promise.all(finalResult);
    }

    async create(repoObject) {
        return await this.repoDB.insertToDB(repoObject);
    }
}
