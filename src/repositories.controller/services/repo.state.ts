import { Injectable } from '@nestjs/common';
import { GitHubRepositoriesService } from './get-repositories-data';
import { RequestBodyInterface } from '../interfaces/request.body.interface';

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

    public async getBranchesFromGithub(repoName: string) {
        return await this.reposService.getBranchesByProject(repoName);
    }

    public async updateRepoByNewBranches(body: RequestBodyInterface) {
        return await this.reposService.updateSingleRepository(body.repoName, body.branches);
    }
}
