import { Module, HttpModule } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { GithubRepository } from './github.repository';

@Module({
  controllers: [
    GithubController
  ],
  imports: [ HttpModule ],
  providers: [
    GithubService,
    GithubRepository
  ]
})
export class GithubModule {  }
