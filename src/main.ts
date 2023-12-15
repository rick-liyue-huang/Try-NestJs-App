import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { createLogger } from 'winston';
import * as winston from 'winston';
import {
  WINSTON_MODULE_NEST_PROVIDER,
  WinstonModule,
  utilities,
} from 'nest-winston';
import 'winston-daily-rotate-file';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { AllExceptionFilter } from './filter/all-exceptioin.filter';
import { LogModule } from './log/log.module';

// declare const module: any;

async function bootstrap() {
  // const logger = new Logger();

  /*
  const instance = createLogger({
    transports: [
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike(),
        ),
      }),
      new winston.transports.DailyRotateFile({
        level: 'warn',
        filename: 'warn-%DATE%.log',
        dirname: 'logs',
        datePattern: 'DD-MM-YYYY',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.simple(),
        ),
      }),
      new winston.transports.DailyRotateFile({
        level: 'info',
        filename: 'info-%DATE%.log',
        dirname: 'logs',
        datePattern: 'DD-MM-YYYY',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.simple(),
        ),
      }),
    ],
  });
  */

  // const logger = WinstonModule.createLogger({ instance });
  const app = await NestFactory.create(AppModule, {
    // logger: false, // disable default logger for the whole project
    // logger: ['error', 'warn', 'debug', 'log', 'verbose'],
    // bufferLogs: true,
    // logger,
  });
  app.setGlobalPrefix('/api/v1');

  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  const httpAdapter = app.get(HttpAdapterHost);

  // app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter));
  const port = 3000;
  await app.listen(port);

  // logger.log(`Application listening on port ${port}`);

  // if (module.hot) {
  //   module.hot.accept();
  //   module.hot.dispose(() => app.close());
  // }
}

bootstrap();
