import { Controller, Get, Res } from '@nestjs/common';
import * as path from 'path';

@Controller()
export class ClientSideController {
  @Get()
  getClientSide(@Res() res) {
    res.sendFile(path.resolve('./dist/client/index.html'));
  }
}
