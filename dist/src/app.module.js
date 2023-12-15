"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./user/user.module");
const range_module_1 = require("./range/range.module");
const config_1 = require("@nestjs/config");
const dotenv = require("dotenv");
const Joi = require("joi");
const typeorm_1 = require("@nestjs/typeorm");
const log_module_1 = require("./log/log.module");
const ormconfig_1 = require("../ormconfig");
const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            range_module_1.RangeModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath,
                load: [() => dotenv.config({ path: '.env' })],
                validationSchema: Joi.object({
                    DB_PORT: Joi.number().required().valid(3306, 3307, 5433),
                    DB_TYPE: Joi.string().required().valid('mysql', 'mariadb'),
                    DB_HOST: Joi.string().required(),
                    DB_USER: Joi.string().required(),
                    DB_PASS: Joi.string().required(),
                    DB_SYNC: Joi.boolean().default(false),
                }),
            }),
            typeorm_1.TypeOrmModule.forRoot(ormconfig_1.ormConfig),
            log_module_1.LogModule,
        ],
        controllers: [],
        providers: [common_1.Logger],
        exports: [common_1.Logger],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map