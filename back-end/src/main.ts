import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import { join } from 'path';
import { AppModule } from './app.module';

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: false,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors(corsOptions));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3000, () => console.log('Application is listening on port 3000'));
}
bootstrap();
