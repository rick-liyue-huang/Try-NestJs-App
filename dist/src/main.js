"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const nest_winston_1 = require("nest-winston");
require("winston-daily-rotate-file");
const all_exceptioin_filter_1 = require("./filter/all-exceptioin.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {});
    app.setGlobalPrefix('/api/v1');
    const logger = app.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER);
    app.useLogger(logger);
    const httpAdapter = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new all_exceptioin_filter_1.AllExceptionFilter(logger, httpAdapter));
    const port = 3000;
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map