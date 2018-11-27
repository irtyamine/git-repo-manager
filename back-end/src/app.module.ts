import { Module, HttpModule } from '@nestjs/common';
import { ReposModule } from './repos/repos.module';

@Module({
  imports: [
      HttpModule,
      ReposModule
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
