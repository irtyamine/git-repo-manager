import { Module } from '@nestjs/common';
import { databaseProviders } from './db.providers/database.providers';

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders]
})

export class DatabaseModule {}