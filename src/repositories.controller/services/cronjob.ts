import { Injectable } from '@nestjs/common';
import { GitHubRepositoriesService } from './get-repositories-data';
import { CronJob } from 'cron';

@Injectable()
export class CronJobService {

    constructor(
        private readonly reposService: GitHubRepositoriesService,
    ) {
        this.updateTimeMorning();
        this.updateTimeEvening();
    }

    private updateTimeMorning() {
        new CronJob('00 00 09 * * 1-5', () => {
            this.reposService.getRepositoriesNamesFromGit(process.env.ACCESS_TOKEN);
        }, null, true, 'Europe/Kiev');
    }

    private updateTimeEvening() {
        new CronJob('00 00 19 * * 1-5', () => {
            this.reposService.getRepositoriesNamesFromGit(process.env.ACCESS_TOKEN);
        }, null, true, 'Europe/Kiev');
    }

}
