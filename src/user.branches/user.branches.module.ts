import { Module } from '@nestjs/common';
import { UserBranchController } from './controller';

@Module({
    controllers: [ UserBranchController ],
    imports: [],
    providers: []
})

export class UserBranchesModule {  }
