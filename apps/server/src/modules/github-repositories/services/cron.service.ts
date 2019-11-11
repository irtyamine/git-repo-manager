import { Injectable } from '@nestjs/common';
import { UpdateRepositoriesService } from './update-repositories.service';
import { CronJob } from 'cron';

@Injectable()
export class CronService {

  constructor(
    private readonly updateRepositories: UpdateRepositoriesService,
  ) {
    this.updateMorning();
    this.updateEvening();
  }

  private updateMorning() {
    return new CronJob('00 13 10 * * 1-5',  async () => {
      await this.updateRepositories.updateRepositories();
    }, null, true, 'Europe/Kiev');
  }

  private updateEvening() {
    return new CronJob('00 00 19 * * 1-5', async () => {
      await this.updateRepositories.updateRepositories();
    }, null, true, 'Europe/Kiev');
  }

}
