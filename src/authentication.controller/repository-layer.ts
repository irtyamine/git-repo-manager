import { Inject, Injectable } from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { GithubUserInterface } from './interfases/github.user.interface';

@Injectable()
export class GithubRepositoryLayer {
  constructor(@Inject('GithubUsersModelToken') private userModel: Model<GithubUserInterface&Document>) {  }

  public insertNewUser(item: GithubUserInterface) {
    const userObject = new this.userModel(item);
    return this.userModel.create(userObject)
      .catch(err => {
        console.log(err);
    });
  }

  public getAccessToken(authToken: string) {
    return this.userModel.findOne({ authToken: authToken }).exec();
  }

  public deleteOldAuthTokens(date: number) {
    return this.userModel.deleteMany({ expiresDate: { $lt: date }}).exec();
  }
}
