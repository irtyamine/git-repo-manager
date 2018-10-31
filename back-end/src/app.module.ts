import { Module } from '@nestjs/common';
import { GithubRepos } from './common/github.repos/controllers/github.repos';
import { GithubReposService } from './services/github.repos.service';

import { HttpModule } from '@nestjs/common';
import { repoProviders } from './common/github.repos/providers/repo.provider';
import { DatabaseModule } from './database/database.module';
import { ReposDbService } from './services/repos.db.service';

@Module({
  imports: [
      HttpModule,
      DatabaseModule
  ],
  controllers: [ GithubRepos ],
  providers: [ GithubReposService, ReposDbService, ...repoProviders],
})
export class AppModule {  }
