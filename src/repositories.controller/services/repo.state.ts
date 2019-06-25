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

    public findRepoDataAtDatabase(name: string, authToken: string) {
        return this.reposService.findRepositoryDataAtDatabase(name, authToken);
    }

    public async getBranchesFromGithub(repoName: string, authToken: string) {
        return await this.reposService.getBranchesByProject(repoName, authToken);
    }

    public async updateRepoByNewBranches(body: RequestBodyInterface, authToken: string) {
        return await this.reposService.updateSingleRepository(body.repoName, body.branches, authToken);
    }

    public async setRepoToDefaultBranches(body: any, authToken: string) {
        return await this.reposService.setRepoBranchesToDefault(body, authToken);
    }
}
