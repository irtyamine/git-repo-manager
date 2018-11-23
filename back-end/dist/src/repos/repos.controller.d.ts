import { ReposService } from './repos.service';
export declare class ReposController {
    private readonly repo;
    constructor(repo: ReposService);
    getRepo(): Promise<{
        publicRepositories: import("./interfaces/repos.interface").Repo[];
        privateRepositories: import("./interfaces/repos.interface").Repo[];
    }>;
}
