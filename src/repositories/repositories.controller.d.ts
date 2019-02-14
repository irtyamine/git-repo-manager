/// <reference path="../../node_modules/@types/mongoose/index.d.ts" />
import { GitHubRepositoriesService } from './repositories.service';
export declare class RepositoriesController {
    private readonly repositoryService;
    constructor(repositoryService: GitHubRepositoriesService);
    getNames(): any[];
    findAllRepositories(req: any): import("mongoose").DocumentQuery<import("home/vs/Projects/pj_GitControl/src/repositories/interfaces/repo.interface").Repo & import("mongoose").Document, import("home/vs/Projects/pj_GitControl/src/repositories/interfaces/repo.interface").Repo & import("mongoose").Document, {}>;
}
