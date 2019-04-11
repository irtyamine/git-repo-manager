import { NestFactory } from '@nestjs/core';
import { ServerModule } from './server.module';
import { join } from 'path';
import 'dotenv/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);
  app.use(cookieParser());
  app.setBaseViewsDir(join(__dirname, '..', 'static'));
  await app.listen(process.env.PORT);
}

bootstrap();
