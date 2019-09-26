import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as path from 'path';

const allowedExt = ['.ico', '.js', '.css', '.scss', '.html'];
const resolvePath = (file: string) => path.resolve(`./dist/client/${file}`);

@Injectable()
export class NewClientSideMiddleware implements NestMiddleware {
  use(req: Request, res: Response): any {
    const { url } = req;
    if (allowedExt.filter(ext => url.indexOf(ext) > 0).length > 0) {
      res.sendFile(resolvePath(url));
    } else {
      res.sendFile(resolvePath('index.html'));
    }
  }
}
