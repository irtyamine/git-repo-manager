import { Module } from '@nestjs/common';
import { GithubRepos } from './controllers/github.repos';
import { GithubReposService } from './services/github.repos.service';

import { HttpModule } from '@nestjs/common';
import { repoProviders } from './controllers/repo.provider';
import { DatabaseModule } from './database/database.module';
import { ReposDbService } from './repository.service/repos.db.service';

@Module({
  imports: [
      HttpModule,
      DatabaseModule
  ],
  controllers: [ GithubRepos ],
  providers: [ GithubReposService, ReposDbService, ...repoProviders],
})
export class AppModule {  }
