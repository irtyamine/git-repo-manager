import { HttpModule, Module } from '@nestjs/common';
import { RepositoriesData } from './controller/repositories-data';
import { UpdateRepositoriesService } from './services/update-repositories.service';

@Module({
  controllers: [
    RepositoriesData
  ],
  imports: [
    HttpModule
  ],
  providers: [
    UpdateRepositoriesService
  ]
})

export class RepositoriesModule {  }
