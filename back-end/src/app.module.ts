import { Module } from '@nestjs/common';
import { ReposModule } from './repos/repos.module';
import { HttpModule } from '@nestjs/common';

@Module({
  imports: [
      HttpModule,
      ReposModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {  }
