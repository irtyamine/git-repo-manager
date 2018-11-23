import { GitHubRepositoriesService } from './repos.service';
export declare class RepositoriesController {
    private readonly repoService;
    constructor(repoService: GitHubRepositoriesService);
    getRepo(): Promise<void>;
}
