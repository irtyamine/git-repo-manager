import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as express from 'express';

const pathToClientSide = path.join(__dirname, '..', 'client');

async function bootstrap() {
  const instance = await NestFactory.create(AppModule);

  instance.enableCors();

  instance.use(compression());
  instance.use(cookieParser());
  instance.use(express.static(pathToClientSide));

  await instance.listen(process.env.PORT);
}
bootstrap().catch(error => {
  console.error('Application bootstrap error!', error);
});
