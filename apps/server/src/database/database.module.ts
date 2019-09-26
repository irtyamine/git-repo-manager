import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({
  imports: [],
  providers: [ ...databaseProviders ]
})

export class DatabaseModule {  }
