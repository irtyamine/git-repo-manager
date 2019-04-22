import { Injectable } from '@nestjs/common';
import { GitHubRepositoriesRepository } from './repositories.repository';
import { RepoDto } from './dto/repo.dto';
const mockReposData = require('./mock.repositories.data.json');

@Injectable()
export class MockRepositoriesRepository extends GitHubRepositoriesRepository {

    public firsInsertToDB(item: RepoDto, parameter?: string) {
        super.firsInsertToDB(item, parameter);
    }

    public insertToDB(item: RepoDto) {
        super.insertToDB(item);
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
