import { Module } from '@nestjs/common';
import { GithubRepositoriesModule } from './github-repositories/github-repositories.module';

@Module({
  imports: [
    GithubRepositoriesModule,
  ],
  exports: [],
  providers: []
})

export class AppModule {}
