import { Module } from '@nestjs/common';
import { PackagesController } from './controller';
import { databaseProviders } from '../common/database.providers';
import { packagesProviders } from './packages.providers';
import { PackagesService } from './packages.service';
import { PackagesRepositoryLayer } from './repository-layer';

@Module({
    controllers: [
        PackagesController
    ],
    imports: [],
    providers: [
        PackagesService,
        PackagesRepositoryLayer,
        ...databaseProviders,
        ...packagesProviders
    ]
})

export class PackagesModule {  }
