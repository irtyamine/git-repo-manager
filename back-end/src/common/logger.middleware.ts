import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';

const date = new Date();
const dateFormat = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}:${(date.getSeconds() < 10 ? '0' : '') + date.getSeconds()}`;

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    resolve(name: string, requestMethod): MiddlewareFunction {
        return (req, res, next) => {
            console.log(`[${name}]  - ${dateFormat}  [${requestMethod}] ${req.url}`);
            next();
        };
    }
}