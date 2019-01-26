import { Controller, Get, Res } from '@nestjs/common';
import * as path from 'path';

@Controller()
export class FrontendController {
  @Get()
  getFront(@Res() response) {
    response.sendFile(path.resolve('../../dist/index.html'));
  }
}