import { Module } from '@nestjs/common';
import { PackagesController } from './controller';
import { databaseProviders } from '../common/database.providers';
import { packagesProviders } from './packages.providers';
import { PackagesService } from './packages.service';
import { PackagesRepositoryLayer } from './repository-layer';
import { GithubRepositoryLayer } from '../authentication.controller/repository-layer';
import { githubUserProviders } from '../authentication.controller/user.providers';

@Module({
    controllers: [
        PackagesController
    ],
    imports: [],
    providers: [
        PackagesService,
        PackagesRepositoryLayer,
        GithubRepositoryLayer,
        ...databaseProviders,
        ...packagesProviders,
        ...githubUserProviders
    ]
})

export class PackagesModule {  }
