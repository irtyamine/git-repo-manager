import { Injectable } from '@nestjs/common';
import { GithubRepository } from './github.repository';
import { GithubUserDto } from './dto/github.user.dto';
const MockUsersData = require('./mock.user.data.json');

@Injectable()
export class MockGithubRepository extends GithubRepository{

    public insertNewUser(item: GithubUserDto) {
        return super.insertNewUser(item);
    }

    public getAccessToken(authToken) {
        const isToken = MockUsersData.users.filter(item => item.authToken === authToken);
        return isToken[0];
    }

    public deleteOldAuthTokens(date: number): Promise<any> {
        return super.deleteOldAuthTokens(date);
    }
}
