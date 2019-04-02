import { HttpModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { GitHubRepositoriesService } from './repositories.service';
import { GitHubRepositoriesRepository } from './repositories.repository';
import { repositoriesProviders } from './repositories.providers';
import { databaseProviders } from '../common/database.providers';
import { LoggerMiddleware } from '../middlewares/logger.middleware';
import { RepositoriesController } from './repositories.controller';
import { AuthService } from '../app.authentication/auth.service';
import { GithubRepository } from '../app.authentication/github.repository';
import { githubUserProviders } from '../app.authentication/github.user.providers';

@Module({
    controllers: [
      RepositoriesController
    ],
    imports: [ HttpModule ],
    providers: [
        GitHubRepositoriesService,
        AuthService,
        GithubRepository,
        GitHubRepositoriesRepository,
        ...repositoriesProviders,
        ...githubUserProviders,
        ...databaseProviders
    ]
})
export class RepositoriesModule {
    // configure(consumer: MiddlewareConsumer) {
    //     consumer
    //         .apply(LoggerMiddleware)
    //         .with('RepositoriesModule', 'GET')
    //         .exclude(
    //             { path: 'repository', method: RequestMethod.ALL }
    //         )
    //         .forRoutes('/');
    // }
}
