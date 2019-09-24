import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { GithubRepositoriesModule } from './github-repositories/github-repositories.module';
import { ClientSideModule } from './client-side/client-side.module';
import { ClientSideMiddleware } from '../middlewares/client-side.middleware';

@Module({
  imports: [
    GithubRepositoriesModule,
    ClientSideModule
  ],
  exports: [],
  providers: []
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(ClientSideMiddleware)
      .forRoutes({
        path: '/',
        method: RequestMethod.ALL
      });
  }
}
