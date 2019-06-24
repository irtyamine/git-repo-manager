import { Injectable } from '@nestjs/common';
import { GithubRepositoryLayer } from './repository-layer';
import { GithubUserInterface } from './interfases/github.user.interface';
const MockUsersData = require('./mock.user.data.json');

@Injectable()
export class MockGithubRepositoryLayer extends GithubRepositoryLayer {

    public insertNewUser(item: GithubUserInterface) {
        return super.insertNewUser(item);
    }

    public getAccessToken(authToken: string) {
        const isToken = MockUsersData.users.filter(item => item.authToken === authToken);
        return isToken[0];
    }

    public deleteOldAuthTokens(date: number): Promise<any> {
        return super.deleteOldAuthTokens(date);
    }
}
