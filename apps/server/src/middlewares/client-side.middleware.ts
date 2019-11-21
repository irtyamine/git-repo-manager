import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as path from 'path';

const allowedExt = ['.ico', '.js', '.css', '.scss', '.html'];
const allowedDataSources = [ 'github' ];
const resolvePath = (file: string) => path.resolve(`./dist/client/${file}`);

@Injectable()
export class ClientSideMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function): any {
    let { url } = req;

    if (url.indexOf('api') > 0) {
      return next();
    } else if (allowedExt.filter(ext => url.indexOf(ext) > 0).length > 0) {
      const urlPath = url.split('\n');

      if (urlPath.indexOf('/apps/client/src/favicon.ico') >= 0) {
        urlPath.splice(urlPath.indexOf('/apps/client/src/favicon.ico'), 1, '/favicon.ico');
        url = urlPath.join('\n');
      }

      res.sendFile(resolvePath(url));
    } else {
      res.sendFile(resolvePath('index.html'));
    }
  }
}
