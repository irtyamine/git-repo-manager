import { MiddlewareConsumer, NestModule } from '@nestjs/common';
export declare class ServerModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void;
}
