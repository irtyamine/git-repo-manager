// import { NestFactory } from '@nestjs/core';
// import { join } from 'path';
// import 'dotenv/config';
// import * as cookieParser from 'cookie-parser';
// import * as compression from 'compression';
// import { BackEndModule } from '../../../src/back-end.module';
//
// const express = require('express');
//
// const server = express();
// server.use(compression());
//
// async function bootstrap() {
//   const app = await NestFactory.create(BackEndModule, server, {});
//   app.use(cookieParser());
//   app.setBaseViewsDir(join(__dirname, '..', 'static'));
//   await app.listen(process.env.PORT);
// }
//
// bootstrap();
