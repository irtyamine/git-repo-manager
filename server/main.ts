import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import { join } from 'path';
import { ServerModule } from './server.module';

const corsOptions = {
    origin: '*',
    credentials: false,
};

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);
  app.use(cors(corsOptions));
  app.setBaseViewsDir(join(__dirname, '..', 'static'));
  app.setViewEngine('hbs');

  await app.listen(3000, () => console.log('Application is listening on port 3000'));
}
bootstrap();
