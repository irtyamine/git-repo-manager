import { HttpModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RepositoriesController } from './repos.controller';
import { GitHubRepositoriesService } from './repos.service';
import { GitHubRepositoriesRepository } from './repos.repository';
import { reposProviders } from './repos.providers';
import { databaseProviders } from '../common/database.providers';
import { LoggerMiddleware } from '../middlewares/logger.middleware';

@Module({
    controllers: [ RepositoriesController ],
    imports: [ HttpModule ],
    providers: [
        GitHubRepositoriesService,
        GitHubRepositoriesRepository,
        ...reposProviders,
        ...databaseProviders
    ]
})
export class ReposModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .with('ReposModule', 'GET')
            .exclude(
                { path: 'repository', method: RequestMethod.ALL }
            )
            .forRoutes('/');
    }
}
