import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [process.env.NODEJS_CLIENT_HOST || 'http://localhost:4200'],
    credentials: true
  });
  app.use(logger('dev'));
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
