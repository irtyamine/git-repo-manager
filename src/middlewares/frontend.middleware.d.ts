import { MiddlewareFunction, NestMiddleware } from '@nestjs/common';
export declare class FrontendMiddleware implements NestMiddleware {
    resolve(...args: any[]): MiddlewareFunction;
}
