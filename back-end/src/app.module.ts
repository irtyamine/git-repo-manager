import { Module } from '@nestjs/common';
import { ReposModule } from './repos/repos.module';
import { HttpModule } from '@nestjs/common';
import { databaseProviders } from './common/database.providers';
import { reposProviders } from './repos/repos.providers';
import { ReposService } from './repos/repos.service';
import { ReposRepository } from './repos/repos.repository';
import { ReposController } from './repos/repos.controller';

@Module({
  exports: [
      ...databaseProviders,
      ...reposProviders
  ],
  imports: [
      HttpModule,
      ReposModule
  ],
  controllers: [ ReposController ],
  providers: [
      ReposService,
      ReposRepository,
      ...databaseProviders,
      ...reposProviders
  ],
})
export class AppModule {  }
