/// <reference path="../../../../../node_modules/@types/mongoose/index.d.ts" />
/// <reference types="mongoose" />
import { GitHubRepositoriesService } from './repos.service';
export declare class RepositoriesController {
    private readonly repositoryService;
    constructor(repositoryService: GitHubRepositoriesService);
    getRepo(): Promise<import("repos/interfaces/repo.interface").Repo[]>;
    findAllRepositories(): import("mongoose").DocumentQuery<import("repos/interfaces/repo.interface").Repo[], import("repos/interfaces/repo.interface").Repo, {}>;
}
