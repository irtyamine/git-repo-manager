import { Module } from '@nestjs/common';

import { GithubAuthController } from './controllers/github-auth.controller';

import { LayerService } from './services/layer.service';
import { GithubAuthService } from './services/github-auth.service';
import { databaseProviders } from '../../database/database.providers';
import { gitHubRepositoriesProviders } from '../../database/repositories.providers';

@Module({
  controllers: [ GithubAuthController ],
  imports: [],
  exports: [],
  providers: [
    LayerService,
    GithubAuthService,
    ...databaseProviders,
    ...gitHubRepositoriesProviders
  ]
})

export class AuthModule {  }
