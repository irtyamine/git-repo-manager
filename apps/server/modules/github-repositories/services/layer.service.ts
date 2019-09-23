import { Injectable, Inject } from '@nestjs/common';
import { Model, Document } from 'mongoose';

import { GithubRepositoryInterface } from '../../../interfaces/github-repository.interface';

@Injectable()
export class LayerService {

  constructor(
    @Inject('NewRepositoryModelToken') private readonly repositoriesModel: Model<GithubRepositoryInterface&Document>
  ) {  }

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
