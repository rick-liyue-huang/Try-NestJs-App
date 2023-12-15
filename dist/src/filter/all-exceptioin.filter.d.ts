import { ExceptionFilter, LoggerService } from '@nestjs/common';
import { ArgumentsHost } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
export declare class AllExceptionFilter implements ExceptionFilter {
    private readonly logger;
    private readonly httpAdapterHost;
    constructor(logger: LoggerService, httpAdapterHost: HttpAdapterHost);
    catch(exception: unknown, host: ArgumentsHost): void;
}
