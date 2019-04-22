import { HttpModule, Module } from '@nestjs/common';
import { GitHubRepositoriesService } from './services/repositories.service';
import { GitHubRepositoriesRepository } from './repositories.repository';
import { repositoriesProviders } from './repositories.providers';
import { databaseProviders } from '../common/database.providers';
import { RepositoriesController } from './repositories.controller';
import { AuthService } from '../app.authentication/auth.service';
import { GithubRepository } from '../app.authentication/github.repository';
import { githubUserProviders } from '../app.authentication/github.user.providers';
import { CronJobService } from './services/cronjob.service';
import { RepoStateService } from './services/repo.state.service';

const reposService = {
    provide: GitHubRepositoriesRepository,
        useClass: GitHubRepositoriesRepository
};

@Module({
    controllers: [
      RepositoriesController
    ],
    imports: [ HttpModule ],
    providers: [
        GitHubRepositoriesService,
        AuthService,
        GithubRepository,
        RepoStateService,
        CronJobService,
        reposService,
        ...repositoriesProviders,
        ...githubUserProviders,
        ...databaseProviders
    ]
})
export class RepositoriesModule {  }
