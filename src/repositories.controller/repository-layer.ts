import { Injectable, Inject } from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { Repo } from './interfaces/repo.interface';
import { RequestBodyInterface } from './interfaces/request.body.interface';

@Injectable()
export class GitHubRepositoriesRepositoryLayer {
  constructor(
      @Inject('RepoModelToken') private repoModel: Model<Repo&Document>,
      @Inject('CustomRepoModelToken') private updateRepoModel: Model<RequestBodyInterface&Document>
  ) {}

  public insertReposNamesToDB(item: Repo, parameter?: string) {
    let newRepositoryObject = new this.repoModel(item);
    this.repoModel.findOneAndUpdate(
      { repoName: parameter },
      { $set: newRepositoryObject },
      { upsert: true },
      (err, res) => {
        if (err) throw err;
      }
    );
  }

  public updateSingleRepository(data: RequestBodyInterface) {
    const newDataObject = new this.updateRepoModel(data);
    this.updateRepoModel.findOneAndUpdate(
      { repoName: newDataObject.repoName, addedBy: newDataObject.addedBy},
      { $set: newDataObject },
      { upsert: true },
      (err, res) => {
        if (err) throw err;
      });
  }

  public setBranchesToDefault(repoName: string, userLogin: string) {
    return this.updateRepoModel.deleteOne({ repoName: repoName, addedBy: userLogin }, (err) => {});
  }

  public insertSingleRepositoryToDB(item: Repo) {
    let repositoryObject = new this.repoModel(item);
    this.repoModel.findOneAndUpdate(
        { repoName: repositoryObject.repoName },
        { $set: repositoryObject },
        { upsert: true },
        (err, res) => {
          if (err) throw err;
        }
    );
  }

  public findRepositoriesNames() {
    return this.repoModel.find({ repoName: { $ne: null } }).select({'repoName': 1, '_id': 0});
  }

  public getRepositoryNameAndTypeToUpdate() {
    return this.repoModel.find({ repoName: { $ne: null } }).select({'repoName': 1, 'repoType': 1, '_id': 0});
  }

  public async findRepositoryData(parameter: string, userLogin: string) {
    const defaultRepo = await this.repoModel.findOne( { repoName: parameter, branches: { $exists: true } }).select({'_id': 0});
    if (!!defaultRepo) {
      const customRepos = await this.updateRepoModel.findOne({ repoName: defaultRepo.repoName, addedBy: userLogin, branches: { $exists: true } });
      if (!customRepos) {
        return defaultRepo;
      } else {
        return customRepos;
      }
    }
  }

  public async getAllRepos(userLogin: string) {
    const customRepos = await this.updateRepoModel.find({ addedBy: userLogin,  branches: { $exists: true } });
    const defaultRepos = await this.repoModel.find({ repoName: { $ne: null }, branches: { $exists: true } });

    for (let customRepo of customRepos) {
      for (let defRepo of defaultRepos) {
        if (customRepo.repoName === defRepo.repoName) {
          defaultRepos.splice(defaultRepos.indexOf(defRepo), 1, customRepo);
        }
      }
    }
    return defaultRepos;
  }
}
