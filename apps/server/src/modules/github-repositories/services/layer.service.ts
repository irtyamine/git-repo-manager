import { Injectable, Inject } from '@nestjs/common';
import { Model, Document } from 'mongoose';

import { GithubRepositoryInterface } from '../../../interfaces/github-repository.interface';
import { GithubPackagesInterface } from '../../../interfaces/github-packages.interface';
import { OrganizationsListInterface } from '../../../interfaces/organizations-list.interface';

@Injectable()
export class LayerService {

  constructor(
    @Inject('NewRepositoryModelToken') private readonly repositoriesModel: Model<GithubRepositoryInterface&Document>,
    @Inject('PackagesModelToken') private readonly packagesModel: Model<GithubPackagesInterface&Document>
  ) {  }

  public async getPackages(orgName: string, dataSource: string) {
    return await this.packagesModel.find({
      organization: orgName,
      dataSource: dataSource
    }).select({ '_id': 0 });
  }

  public async getRepositories(organizationName: string, dataSource: string) {
    return await this.repositoriesModel.find({
        organization: organizationName,
        dataSource: dataSource,
        branches: { $exists: true }
      },
      (err, res) => {
      if (err) { throw err; }
    }).select({ '_id': 0, 'organization': 0, 'dataSource': 0 });
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
