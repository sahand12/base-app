import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RequestIdMiddleware } from './middlewares/request-id.middleware';
import { logger, LoggerMiddleware } from './middlewares/logger.middleware';

declare const module: any;

async function bootstrap() {
  // configure dotenv module
  require('dotenv').config();

  // Create app instance
  const app = await NestFactory.create(AppModule);

  // Listen for connections
  await app.listen(process.env.PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
