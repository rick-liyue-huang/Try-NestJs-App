"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nest_winston_1 = require("nest-winston");
const transports_1 = require("winston/lib/winston/transports");
const winston = require("winston");
const nest_winston_2 = require("nest-winston");
require("winston-daily-rotate-file");
const config_enum_1 = require("../enum/config.enum");
let LogModule = class LogModule {
};
exports.LogModule = LogModule;
exports.LogModule = LogModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_winston_1.WinstonModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const consoleTransport = new transports_1.Console({
                        level: 'info',
                        format: winston.format.combine(winston.format.timestamp(), nest_winston_2.utilities.format.nestLike()),
                    });
                    const dailyTransport = new transports_1.DailyRotateFile({
                        level: 'warn',
                        filename: 'warn-%DATE%.log',
                        dirname: 'logs',
                        datePattern: 'DD-MM-YYYY',
                        zippedArchive: true,
                        maxSize: '20m',
                        maxFiles: '14d',
                        format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
                    });
                    const dailyInfoTransport = new transports_1.DailyRotateFile({
                        level: configService.get(config_enum_1.LogEnum.LOG_LEVEL),
                        filename: 'info-%DATE%.log',
                        dirname: 'logs',
                        datePattern: 'DD-MM-YYYY',
                        zippedArchive: true,
                        maxSize: '20m',
                        maxFiles: '14d',
                        format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
                    });
                    return {
                        transports: [
                            consoleTransport,
                            ...(configService.get(config_enum_1.LogEnum.LOG_ON)
                                ? [dailyInfoTransport, dailyTransport]
                                : []),
                        ],
                    };
                },
            }),
        ],
        controllers: [],
        providers: [],
    })
], LogModule);
//# sourceMappingURL=log.module.js.map