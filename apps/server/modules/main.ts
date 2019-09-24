import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import 'dotenv/config';
import * as compression from 'compression';

const express = require('express');

const server = express();
server.use(compression());

async function bootstrap() {
  const app = await NestFactory.create(AppModule, server, {});
  app.setBaseViewsDir(join(__dirname, '..', 'client'));
  await app.listen(3000);
}
bootstrap();
