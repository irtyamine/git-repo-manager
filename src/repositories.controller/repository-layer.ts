import { Injectable, Inject } from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { Repo } from './interfaces/repo.interface';
import { RequestBodyInterface } from './interfaces/request.body.interface';

@Injectable()
export class GitHubRepositoriesRepositoryLayer {
  constructor(
      @Inject('RepoModelToken') private repoModel: Model<Repo&Document>,
      @Inject('RepoModelToken') private updateRepoModel: Model<RequestBodyInterface&Document>
  ) {}

  public insertReposNamesToDB(item: Repo, parameter?: string) {
    let newRepositoryObject = new this.repoModel(item);
    this.repoModel.findOneAndUpdate(
      { repoName: parameter },
      { $set: newRepositoryObject },
      { upsert: true },
      (err, res) => {
        if (!newRepositoryObject.repoName) {
          return null;
        }
      }
    );
  }

  public updateSingleRepository(data: RequestBodyInterface) {
    const newDataObject = new this.repoModel(data);
    this.repoModel.updateOne(
        { repoName: newDataObject.repoName },
        {$set: { branches:  newDataObject.branches  }},
        {new: true},
        (err, res) => {
          if (err) throw err;
        });
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
    return this.repoModel.find({ repoName: { $ne: null }, branches: { $exists: true } }).select({'repoName': 1, 'repoType': 1, '_id': 0});
  }

  public findRepositoryData(parameter) {
    return this.repoModel.findOne( { repoName: parameter, branches: { $exists: true } }).select({'_id': 0});
  }

  public getAllRepos() {
    return this.repoModel.find({ repoName: { $ne: null }, branches: { $exists: true } });
  }
}
