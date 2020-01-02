import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm'
import { connection } from './config/database-connection';
import { UserModule } from './modules/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(connection),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
