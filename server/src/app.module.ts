import { HttpModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { FrontendMiddleware } from './middlewares/frontend.middleware';
import { ReposModule } from './repos/repos.module';

@Module({
  imports: [
      HttpModule,
      ReposModule
  ],
  exports: [],
  controllers: [  ],
  providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(FrontendMiddleware)
            .forRoutes({
                path: '/',
                method: RequestMethod.ALL
            });
    }
}
