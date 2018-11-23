import { HttpService } from '@nestjs/common';
import { ReposRepository } from './repos.repository';
export declare class ReposService {
    private readonly httpService;
    private readonly repoDB;
    constructor(httpService: HttpService, repoDB: ReposRepository);
    getRepo(): Promise<number>;
    private makeRequestToGitHubLink;
    private getReposData;
}
