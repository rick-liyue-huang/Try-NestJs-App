import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModule, WinstonModuleOptions } from 'nest-winston';
import { Console, DailyRotateFile } from 'winston/lib/winston/transports';
import * as winston from 'winston';
import { utilities } from 'nest-winston';
import 'winston-daily-rotate-file';
import { LogEnum } from '../enum/config.enum';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const consoleTransport = new Console({
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike(),
          ),
        });

        const dailyTransport = new DailyRotateFile({
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
        });

        const dailyInfoTransport = new DailyRotateFile({
          level: configService.get(LogEnum.LOG_LEVEL),
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
        });

        return {
          transports: [
            consoleTransport,
            ...(configService.get(LogEnum.LOG_ON)
              ? [dailyInfoTransport, dailyTransport]
              : []),
          ],
        } as WinstonModuleOptions;
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class LogModule {}
