import { NestFactory } from '@nestjs/core';
import { ServerModule } from './server.module';
import { join } from 'path';
import 'dotenv/config';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';

const express = require('express');

const server = express();
server.use(compression());

async function bootstrap() {
  const app = await NestFactory.create(ServerModule, server, {});
  app.use(cookieParser());
  app.setBaseViewsDir(join(__dirname, '..', 'static'));
  await app.listen(process.env.PORT);
}

bootstrap();
