import { Inject, Injectable } from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { GithubUserInterface } from './interfases/github.user.interface';
import { GithubUserDto } from './dto/github.user.dto';

@Injectable()
export class GithubRepository {
  constructor(@Inject('GithubUsersModelToken') private userModel: Model<GithubUserInterface&Document>) {  }

  public insertNewUser(item: GithubUserDto) {
    const userObject = new this.userModel(item);
    return this.userModel.create(userObject);
  }

  public getAuthToken(authToken) {
    return this.userModel.findOne({ authToken: authToken }).exec();
  }

  public deleteOldAuthTokens() {
    return this.userModel.deleteMany({ expiresDate: { $lte: Date.now() } }).exec();
  }
}