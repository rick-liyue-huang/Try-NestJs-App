import { Global, Logger, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RangeModule } from './range/range.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LogModule } from './log/log.module';
import { ormConfig } from '../ormconfig';

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;

@Global()
@Module({
  imports: [
    UserModule,
    RangeModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })],
      // load: [Configuration],
      validationSchema: Joi.object({
        DB_PORT: Joi.number().required().valid(3306, 3307, 5433),
        DB_TYPE: Joi.string().required().valid('mysql', 'mariadb'),
        DB_HOST: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.string().required(),
        DB_SYNC: Joi.boolean().default(false),
      }),
    }),
    TypeOrmModule.forRoot(ormConfig),
    /*
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'example',
      entities: [],
      synchronize: true, // sync db schema to entities, init db
      logging: ['error'],
    }),
    */
    /*
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        ({
          type: config.get(ConfigEnum.DB_TYPE),
          host: config.get(ConfigEnum.DB_HOST),
          port: config.get(ConfigEnum.DB_PORT),
          database: config.get(ConfigEnum.DB_NAME),
          username: config.get(ConfigEnum.DB_USER),
          password: config.get(ConfigEnum.DB_PASS),
          entities: [User, Role, Log, Profile],
          synchronize: config.get(ConfigEnum.DB_SYNC), // sync db schema to entities, init db
          // logging: ['error'],
          logging: process.env.NODE_ENV !== 'development', // true for development, false for production
        }) as TypeOrmModuleOptions,
    }),
    */
    LogModule,
    // LoggerModule.forRoot({
    //   pinoHttp: {
    //     transport: {
    //       targets: [
    //         {
    //           level: 'info',
    //           target: 'pino-pretty',
    //           options: {
    //             colorize: true,
    //           },
    //         },
    //         {
    //           level: 'info',
    //           target: 'pino-roll',
    //           options: {
    //             file: join('logs', 'logs.txt'),
    //             frequency: 'daily',
    //             size: '10M',
    //             mkdir: true,
    //           },
    //         },
    //       ],
    //     },
    //     /*
    //       process.env.NODE_ENV === 'development'
    //         ? {
    //             target: 'pino-pretty',
    //             options: {
    //               colorize: true,
    //             },
    //           }
    //         : {
    //             target: 'pino-roll',
    //             options: {
    //               file: 'logs.txt',
    //               frequency: 'daily',
    //               mkdir: true,
    //             },
    //           },
    //           */
    //   },
    // }),
  ],
  controllers: [],
  providers: [Logger], // from nestjs/common
  exports: [Logger], // from nestjs/common
})
export class AppModule {}
