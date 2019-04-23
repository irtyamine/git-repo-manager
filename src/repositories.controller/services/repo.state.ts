import { Injectable } from '@nestjs/common';
import { GitHubRepositoriesService } from './get-repositories-data';

@Injectable()
export class RepoStateService {
    constructor(
        private readonly reposService: GitHubRepositoriesService,
    ) {}

    public async getNames() {
        return await this.reposService.getRepositoriesNamesFromDb();
    }

    public findRepoDataAtDatabase(name: string) {
        return this.reposService.findRepositoryDataAtDatabase(name);
    }
}
