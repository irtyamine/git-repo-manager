import { HttpModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { FrontendMiddleware } from './middlewares/frontend.middleware';
import { RepositoriesModule } from './repositories.controller/repositories.module';
import { FrontendController } from './frontend.controller';
import { AuthModule } from './authentication.controller/auth.module';
import { PackagesModule } from './packages.controller/packages.module';

@Module({
  imports: [
    HttpModule,
    RepositoriesModule,
    AuthModule,
    PackagesModule
  ],
  exports: [],
  controllers: [
    FrontendController
  ],
  providers: [],
})
export class BackEndModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(FrontendMiddleware)
            .forRoutes({
                path: '/',
                method: RequestMethod.ALL
            });
    }
}
