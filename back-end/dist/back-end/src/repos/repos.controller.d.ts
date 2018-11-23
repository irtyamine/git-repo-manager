import { GitHubRepositoriesService } from './repos.service';
export declare class RepositoriesController {
    private readonly repositoryService;
    constructor(repositoryService: GitHubRepositoriesService);
    getRepo(): Promise<import("./interfaces/repo.interface").Repo[]>;
    findAllRepositories(): Promise<import("./interfaces/repo.interface").Repo[]>;
}
