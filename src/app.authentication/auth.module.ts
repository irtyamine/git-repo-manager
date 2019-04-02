import { HttpModule, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GithubStrategy } from './github.strategy';
import { AuthService } from './auth.service';
import { GithubRepository } from './github.repository';
import { githubUserProviders } from './github.user.providers';
import { databaseProviders } from '../common/database.providers';

@Module({
  imports: [ HttpModule ],
  controllers: [ AuthController ],
  providers: [
    AuthService,
    GithubRepository,
    GithubStrategy,
    ...databaseProviders,
    ...githubUserProviders
  ]
})

export class AuthModule {  }