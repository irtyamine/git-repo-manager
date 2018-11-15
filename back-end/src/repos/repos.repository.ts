import { Injectable, Inject } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Repo } from './interfaces/repos.interface';
import { CreateReposDto } from './dto/create.repos.dto';

@Injectable()
export class ReposRepository {
  constructor(@Inject('RepoModelToken') private readonly repoModel: Model<Repo>) {}

  async insertToDB(item: CreateReposDto) {
    mongoose.set('useFindAndModify', false);
    process.nextTick(() => {
      this.repoModel.findOneAndUpdate(
        { repoName: item.repoName },
        { $set: item },
        {
          upsert: true
        },
        (err, res) => {
          if (err) {
            throw err;
          }
          console.log('Upload');
        },
      );
    });
  }

  async findReposData() {
      return this.repoModel.find();
  }

}
