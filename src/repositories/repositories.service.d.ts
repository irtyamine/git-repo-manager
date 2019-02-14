/// <reference path="../../node_modules/@types/mongoose/index.d.ts" />
import { HttpService } from '@nestjs/common';
import { GitHubRepositoriesRepository } from './repositories.repository';
import { Repo } from './interfaces/repo.interface';
import { ConfigService } from '../../config/config.service';
export declare class GitHubRepositoriesService {
    private readonly httpService;
    private readonly repoDB;
    private readonly configFile;
    constructor(httpService: HttpService, repoDB: GitHubRepositoriesRepository, configFile: ConfigService);
    updateTime(): void;
    getNamesFromDB(): any[];
    private makeRequestToGitHubLink;
    private countUpdatedRepositories;
    private createGithubLinkAndGetDataFromGitHub;
    private getRepositoryData;
    findAllDataAtDatabase(parameter: any): import("mongoose").DocumentQuery<Repo & import("mongoose").Document, Repo & import("mongoose").Document, {}>;
}
