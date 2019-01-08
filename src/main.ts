import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { ServerModule } from './server.module';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);
  app.setBaseViewsDir(join(__dirname, '..', 'static'));

  await app.listen(3000, () => console.log('Application is listening on port 3000'));
}

bootstrap();
