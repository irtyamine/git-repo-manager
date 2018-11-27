/// <reference path="../../../../../node_modules/@types/mongoose/index.d.ts" />
/// <reference types="mongoose" />
import { HttpService } from '@nestjs/common';
import { GitHubRepositoriesRepository } from './repos.repository';
export declare class GitHubRepositoriesService {
    private readonly httpService;
    private readonly repoDB;
    constructor(httpService: HttpService, repoDB: GitHubRepositoriesRepository);
    getRepositories(): Promise<import("repos/interfaces/repo.interface").Repo[]>;
    private makeRequestToGitHubLink;
    private getRepositoryData;
    findAllDataAtDatabase(): import("mongoose").DocumentQuery<import("repos/interfaces/repo.interface").Repo[], import("repos/interfaces/repo.interface").Repo, {}>;
}
