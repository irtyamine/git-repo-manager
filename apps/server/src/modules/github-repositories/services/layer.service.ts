import { Injectable, Inject } from '@nestjs/common';
import { Model, Document } from 'mongoose';

import { GithubRepositoryInterface } from '../../../interfaces/github-repository.interface';
import { GithubPackagesInterface } from '../../../interfaces/github-packages.interface';
import { OrganizationsListInterface } from '../../../interfaces/organizations-list.interface';
import { UserDataInterface } from '../../../interfaces/user-data.interface';
import { CustomBranchesInterface } from '../../../interfaces/custom-branches.interface';

@Injectable()
export class LayerService {

  constructor(
    @Inject('NewRepositoryModelToken') private readonly repositoriesModel: Model<GithubRepositoryInterface&Document>,
    @Inject('PackagesModelToken') private readonly packagesModel: Model<GithubPackagesInterface&Document>,
    @Inject('OrganizationsModelToken') private readonly organizationsListModel: Model<OrganizationsListInterface&Document>,
    @Inject('UsersModelToken') private readonly usersModel: Model<UserDataInterface&Document>,
    @Inject('CustomBranchesToken') private readonly customBranchesModel: Model<CustomBranchesInterface&Document>
  ) {  }

  public async getOrganizations(dataSource: string) {
    return await this.organizationsListModel
      .find({
        organizationDataStorage: { $elemMatch: { $in: dataSource }}
      })
      .select({'_id': 0, 'organizationName': 1});
  }

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

  public async getRepoDetails(query: string) {
    return await this.repositoriesModel
      .findOne(query)
      .select({
        '_id': 0,
        'organization': 0
      });
  }

  public async getUserAccessToken(authToken: string) {
    return await this.usersModel
      .findOne({ authToken: authToken })
      .select({ '_id': 0, 'accessToken': 1 })
  }

  public async getAllCustomBranches(
    query: {
      repoName: string,
      addedBy: string,
      organization: string,
      vcs: string
    }) {

    return await this.customBranchesModel
      .find({
        repoName: query.repoName,
        addedBy: query.addedBy,
        organization: query.organization,
        vcs: query.vcs
      })
      .select({ '_id': 0, 'branches': 1 })
  }

  public async setCustomBranches(customBranches: CustomBranchesInterface) {
    const newCustomBranches = new this.customBranchesModel(customBranches);

    return await this.customBranchesModel
      .create(newCustomBranches)
      .then(async () => {
        return await this.getAllCustomBranches({
          repoName: newCustomBranches.repoName,
          addedBy: newCustomBranches.addedBy,
          organization: newCustomBranches.organization,
          vcs: newCustomBranches.vcs
        });
      })
  }

}
