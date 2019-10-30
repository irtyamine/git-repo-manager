import { Injectable } from '@nestjs/common';
import { GitHubRepositoriesRepositoryLayer } from './repository-layer';
import { Repo } from './interfaces/repo.interface';
const mockReposData = require('../api-tests/mock.repositories.data.json');

@Injectable()
export class MockRepositoriesRepositoryLayer extends GitHubRepositoriesRepositoryLayer {

    public insertReposNamesToDB(item: Repo, parameter?: string) {
        super.insertReposNamesToDB(item, parameter);
    }

    public insertSingleRepositoryToDB(item: Repo) {
        super.insertSingleRepositoryToDB(item);
    }

    public getRepositoryNameAndTypeToUpdate() {
        return mockReposData.repositoriesNamesAndTypes;
    }

    public findRepositoriesNames() {
        return mockReposData.repositoriesNames;
    }

    public findRepositoryData(parameter) {
        return mockReposData.repositoryData;
    }
}
