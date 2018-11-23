import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Repo } from './interfaces/repo.interface';
import { RepoDto } from './dto/repo.dto';

@Injectable()
export class GitHubRepositoriesRepository {
  constructor(@Inject('RepoModelToken') private readonly repoModel: Model<Repo>) {}

  async insertToDB(item: RepoDto) {
    process.nextTick(() => {
      this.repoModel.findOneAndUpdate(
        { repoName: item.repoName },
        { $set: item },
        {
          upsert: true
        },
        (err, res) => {
          if (err) throw err;
          console.log('Upload');
        },
      );
    });
  }

    findRepositoriesData() {
      return this.repoModel.find();
  }

}
