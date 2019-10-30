import { HttpModule, Module } from '@nestjs/common';
import { GitHubRepositoriesService } from './services/get-repositories-data';
import { GitHubRepositoriesRepositoryLayer } from './repository-layer';
import { repositoriesProviders } from './repositories.providers';
import { databaseProviders } from '../common/database.providers';
import { AuthService } from '../authentication.controller/auth.service';
import { GithubRepositoryLayer } from '../authentication.controller/repository-layer';
import { githubUserProviders } from '../authentication.controller/user.providers';
import { CronJobService } from './services/cronjob';
import { RepoStateService } from './services/repo.state';
import { RepositoriesController } from './controller';
import { packagesProviders } from '../packages.controller/packages.providers';
import { PackagesRepositoryLayer } from '../packages.controller/repository-layer';

const reposService = {
    provide: GitHubRepositoriesRepositoryLayer,
        useClass: GitHubRepositoriesRepositoryLayer
};

@Module({
    controllers: [
      RepositoriesController
    ],
    imports: [ HttpModule ],
    providers: [
        GitHubRepositoriesService,
        AuthService,
        GithubRepositoryLayer,
        RepoStateService,
        CronJobService,
        PackagesRepositoryLayer,
        reposService,
        ...repositoriesProviders,
        ...githubUserProviders,
        ...packagesProviders,
        ...databaseProviders
    ]
})
export class RepositoriesModule {  }
