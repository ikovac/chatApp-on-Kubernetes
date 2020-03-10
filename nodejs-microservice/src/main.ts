import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as restLogger from 'morgan';
import { execSync } from 'child_process';
import { RedisIoAdapter } from './modules/events/redis-io.adapter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new RedisIoAdapter(app));

  app.enableCors({
    origin: [process.env.NODEJS_CLIENT_HOST || 'https://chatapp.test.com'],
    credentials: true,
  });
  app.use(restLogger('dev'));
  app.use(cookieParser());

  try {
    execSync('npm run typeorm:run');
    logger.log('Migration run was completed successfully');
  } catch (err) {
    logger.error('Migration run failed.');
  }

  await app.listen(3000);
}
bootstrap();
