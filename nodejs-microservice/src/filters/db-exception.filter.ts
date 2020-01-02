import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class DbExceptionFilter<T> extends BaseExceptionFilter implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    console.log("Custom error!");
  }
}
