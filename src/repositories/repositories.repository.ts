import { Injectable, Inject } from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { RepoDto } from './dto/repo.dto';
import { Repo } from './interfaces/repo.interface';

@Injectable()
export class GitHubRepositoriesRepository {
  constructor(@Inject('RepoModelToken') private repoModel: Model<Repo&Document>) {}

  public firsInsertToDB(item: RepoDto, parameter?: string) {
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

  public insertToDB(item: RepoDto) {
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
    return this.repoModel.find().select({'repoName': 1, '_id': 0});
  }

  public  findRepositoriesData(parameter) {
    return this.repoModel.findOne( { repoName: parameter });
  }
}
