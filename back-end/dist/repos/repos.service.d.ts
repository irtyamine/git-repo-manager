import { HttpService } from '@nestjs/common';
import { GitHubRepositoriesRepository } from './repos.repository';
export declare class GitHubRepositoriesService {
    private readonly httpService;
    private readonly repoDB;
    constructor(httpService: HttpService, repoDB: GitHubRepositoriesRepository);
    getRepositories(): Promise<void>;
    private makeRequestToGitHubLink;
    private getRepositoryData;
}
