import { MiddlewareFunction, Injectable, NestMiddleware } from '@nestjs/common';
import * as path from 'path';

const allowedExt = ['.js', '.ico', '.css', '.scss'];

const resolvePath = (file: string) => path.resolve(`./dist/client/${file}`);

@Injectable()
export class ClientSideMiddleware implements NestMiddleware {
  resolve(...args): MiddlewareFunction | Promise<MiddlewareFunction> {
    return (req, res) => {
      const { url } = req;
      if (allowedExt.filter(ext => url.indexOf(ext) > 0).length > 0) {
        res.sendFile(resolvePath(url));
      } else {
        res.sendFile(resolvePath('index.html'));
      }
    };
  }
}
