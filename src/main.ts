import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { ServerModule } from './server.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);
  app.setBaseViewsDir(join(__dirname, '..', 'static'));
  app.use(cookieParser());
  await app.listen(3000);
}

bootstrap();
