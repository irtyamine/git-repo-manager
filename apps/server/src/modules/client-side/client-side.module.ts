import { Module } from '@nestjs/common';
import { ClientSideController } from './controller/client-side';

@Module({
  controllers: [ ClientSideController ]
})

export class ClientSideModule {  }
