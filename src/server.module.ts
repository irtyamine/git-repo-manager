import { HttpModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { FrontendMiddleware } from './middlewares/frontend.middleware';
import { RepositoriesModule } from './repositories/repositories.module';
import { FrontendController } from './frontend.controller';
import { AuthModule } from './app.authentication/auth.module';

@Module({
  imports: [
    HttpModule,
    RepositoriesModule,
    AuthModule
  ],
  exports: [],
  controllers: [
    FrontendController
  ],
  providers: [],
})
export class ServerModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(FrontendMiddleware)
            .forRoutes({
                path: '/',
                method: RequestMethod.ALL
            });
    }
}
