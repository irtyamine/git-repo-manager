import { HttpModule, Module } from '@nestjs/common';

import { GithubAuthController } from './controllers/github-auth.controller';

import { LayerService } from './services/layer.service';
import { GithubAuthService } from './services/github-auth.service';
import { databaseProviders } from '../../database/database.providers';
import { gitHubRepositoriesProviders } from '../../database/repositories.providers';
import { GithubStrategy } from './starategies/github.strategy';

@Module({
  controllers: [ GithubAuthController ],
  imports: [ HttpModule ],
  exports: [],
  providers: [
    LayerService,
    GithubStrategy,
    GithubAuthService,
    ...databaseProviders,
    ...gitHubRepositoriesProviders
  ]
})

export class AuthModule {  }
