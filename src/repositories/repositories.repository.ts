import { Injectable, Inject } from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { RepoDto } from './dto/repo.dto';
import { Repo } from './interfaces/repo.interface';

@Injectable()
export class GitHubRepositoriesRepository {
  constructor(@Inject('RepoModelToken') private repoModel: Model<Repo&Document>) {}

  async insertToDB(item: RepoDto) {
    let repositoryObject = new this.repoModel(item);
    this.repoModel.findOneAndUpdate(
        { repoName: repositoryObject.repoName },
        { $set: repositoryObject,  },
        {
          upsert: true
        },
        (err) => {
          if (err) throw err;
          console.log('Upload');
        },
      );
  }

    findRepositoriesData() {
      return this.repoModel.find();
  }

}
