import { Model, Schema } from 'mongoose';
import { Injectable, Inject, HttpService } from '@nestjs/common';
import * as _ from 'lodash';
import { Repo } from '../interfaces/repo.interface';
import { CreateRepoDto } from '../dto/create-repo.dto';
import repo_config from '../parameters/repo_data_config';

@Injectable()
export class GithubReposService {

    private arrayId: any = [];

    constructor(private readonly httpService: HttpService, @Inject('RepoModelToken') private readonly repoModel: Model<Repo>) {  }

    async getRepoData(route) {
        try {
            const result = await this.httpService.get(route).toPromise();
            const fin_res = result.data;
            const dependencies = Object.assign({}, fin_res.devDependencies, fin_res.dependencies);
            const staticRepoData = _.reduce(repo_config.staticRepoData, (result, filedName) => {
                result[filedName] = fin_res[filedName];
                return result;
            }, {});

            const dependenciesRepo = _.reduce(repo_config.object_packages, (result, packageName) => {
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
                let error_message = {};
                return error_message;
            }
        }
    }

    async getRepo() {
        const obj1 = [];
        const asyncForEach = async (array, callback) => {
            for (let i = 0; i < array.length; i++) {
                await callback(array[i], i, array)
            }
        };

        await asyncForEach(repo_config.repositories, async (repo) => {
            const obj = await _.reduce(repo_config.branches, async (result, branch) => {
                const syncResult = await result;
                syncResult[branch] = await this.getRepoData(`https://raw.githubusercontent.com/${repo}/${branch}/package.json`);
                return syncResult;
            }, {});
            const resultData = obj1.push(Object.assign({repo_name: repo, timestamp: new Date}, obj));
            return resultData;
        });
        _.forEach(obj1, (item) => {
            this.create(item);
            return;
        });
    }

    async create(createRepoDto: CreateRepoDto): Promise<Repo> {
        const arrId = [];
        const createdRepo = new this.repoModel(createRepoDto);
            return await createdRepo.save({ validateBeforeSave: false }, async (err, result) => {
                this.arrayId = arrId.push(result._id);
                let obj = await this.findById(this.arrayId);
                console.log(obj);
            });
    }

    async findById(parameter): Promise<Repo[]> {
        return await this.repoModel.find({_id: { $in: [parameter] }});
    }

    async findAll(): Promise<Repo[]> {
        return await this.repoModel.find().sort({ $natural: -1 }).limit(repo_config.repositories.length);
    }
}
