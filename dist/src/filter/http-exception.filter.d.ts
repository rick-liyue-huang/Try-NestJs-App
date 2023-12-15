import { ArgumentsHost, ExceptionFilter, LoggerService } from '@nestjs/common';
export declare class HttpExceptionFilter implements ExceptionFilter {
    private logger;
    constructor(logger: LoggerService);
    catch(exception: any, host: ArgumentsHost): void;
}
