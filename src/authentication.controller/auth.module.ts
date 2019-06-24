import { HttpModule, Module } from '@nestjs/common';
import { AuthController } from './controller';
import { GithubStrategy } from './github.strategy';
import { AuthService } from './auth.service';
import { GithubRepositoryLayer } from './repository-layer';
import { githubUserProviders } from './user.providers';
import { databaseProviders } from '../common/database.providers';

@Module({
  imports: [ HttpModule ],
  controllers: [ AuthController ],
  providers: [
    AuthService,
    {
      provide: GithubRepositoryLayer,
      useClass: GithubRepositoryLayer
    },
    GithubStrategy,
    ...databaseProviders,
    ...githubUserProviders
  ]
})

export class AuthModule {  }
