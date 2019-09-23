import { Injectable, Inject } from '@nestjs/common';
import { Model, Document } from 'mongoose';

import { GithubRepositoryInterface } from '../../../interfaces/github-repository.interface';

@Injectable()
export class LayerService {

  constructor(
    @Inject('NewRepositoryModelToken') private readonly repositoriesModel: Model<GithubRepositoryInterface&Document>
  ) {  }

  public async getRepositories(organizationName: string, dataSource: string) {
    return await this.repositoriesModel.find({
        organization: organizationName,
        dataSource: dataSource
      },
      (err, res) => {
      if (err) { throw err; }
    }).select({ '_id': 0 });
  }

  public async updateRepositoryData(repository: GithubRepositoryInterface) {
    const newRepository = new this.repositoriesModel(repository);

    await this.repositoriesModel.findOneAndUpdate(
      {
        repoName: newRepository.repoName,
        organization: newRepository.organization,
        dataSource: newRepository.dataSource
      },
      { $set: newRepository },
      { upsert: true },
      (err, res) => {
        if (err) { throw err; }
      }
    );
  }

}
