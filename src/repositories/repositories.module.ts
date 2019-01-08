import { HttpModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { GitHubRepositoriesService } from './repositories.service';
import { GitHubRepositoriesRepository } from './repositories.repository';
import { repositoriesProviders } from './repositories.providers';
import { databaseProviders } from '../common/database.providers';
import { LoggerMiddleware } from '../middlewares/logger.middleware';
import { RepositoriesController } from './repositories.controller';
import { FrontendController } from '../frontend.controller';

@Module({
    controllers: [ RepositoriesController, FrontendController ],
    imports: [ HttpModule ],
    providers: [
        GitHubRepositoriesService,
        GitHubRepositoriesRepository,
        ...repositoriesProviders,
        ...databaseProviders
    ]
})
export class RepositoriesModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .with('RepositoriesModule', 'GET')
            .exclude(
                { path: 'repository', method: RequestMethod.ALL }
            )
            .forRoutes('/');
    }
}
