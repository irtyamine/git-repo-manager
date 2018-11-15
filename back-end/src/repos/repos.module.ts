import { Module } from '@nestjs/common';
import { ReposController } from './repos.controller';
import { ReposService } from './repos.service';
import { ReposRepository } from './repos.repository';
import { HttpModule } from '@nestjs/common';
import { reposProviders } from './repos.providers';
import { databaseProviders } from '../common/database.providers';

@Module({
    controllers: [ReposController],
    imports: [ HttpModule ],
    providers: [
        ReposService,
        ReposRepository,
        ...reposProviders,
        ...databaseProviders
    ]
})
export class ReposModule {}
