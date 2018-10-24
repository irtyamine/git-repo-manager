import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { GithubRepos } from './controllers/github.repos';
import { GithubReposService } from './services/github.repos.service';

import { HttpModule } from '@nestjs/common';
import { repoProviders } from './controllers/repo.provider';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
      HttpModule,
      DatabaseModule
  ],
  controllers: [ AppController, GithubRepos ],
  providers: [ AppService, GithubReposService, ...repoProviders],
})
export class AppModule {  }
