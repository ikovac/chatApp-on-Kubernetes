import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import { execSync } from 'child_process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [process.env.NODEJS_CLIENT_HOST || 'http://localhost:4200'],
    credentials: true,
  });
  app.use(logger('dev'));
  app.use(cookieParser());

  let migrationRunCompleted = false;

  while (!migrationRunCompleted) {
    try {
      const stdout = execSync('npm run typeorm:run');
      migrationRunCompleted = true;
      console.log('Migration run was completed successfully');
    } catch (err) {
      console.log('Migration run failed, retry...');
    }
  }

  await app.listen(3000);
}
bootstrap();
