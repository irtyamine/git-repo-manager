import { Module, HttpModule } from '@nestjs/common';
import { ReposModule } from './repos/repos.module';
import { MyLogger } from './common/my.logger';

@Module({
  imports: [
      HttpModule,
      ReposModule
  ],
  exports: [MyLogger],
  controllers: [],
  providers: [MyLogger],
})
export class AppModule {}
