import { NestMiddleware, MiddlewareFunction } from '@nestjs/common';
export declare class LoggerMiddleware implements NestMiddleware {
    resolve(name: string, requestMethod: any): MiddlewareFunction;
}
