import { ExceptionFilter, Catch, ArgumentsHost, HttpException, ExecutionContext, CallHandler, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, catchError, map, throwError } from 'rxjs';
import { FilterResponseHelper } from 'shared/filter_response/application/helper/filter_response.helper';
import { LogHelper } from 'shared/log/application/helper/log.helper';

export class FilterResponseInterceptor implements NestInterceptor {
    catch(exception: HttpException, host: ArgumentsHost) {
        console.log("🚀 ~ file: filter_response.interceptor.ts:9 ~ FilterResponseInterceptor ~ exception:")
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        return handler.handle().pipe(
            map((body: Observable<any>) => {
                return {
                    statusCode: response.statusCode,
                    message: response.message,
                    data: body,
                }
            }),
            catchError((error) => new Observable(observer => {
                const extracts = FilterResponseHelper.extractOrigin(error.stack);
                const statusCode = error?.response?.statusCode ?? error?.status ?? 500;
                const message = error?.response?.message ?? error?.message ?? FilterResponseHelper.functionMap(extracts);
                LogHelper.printError(request.method, request.url, error.status, { message: error.message, extracts, data: request?.body });
                response.statusCode = statusCode;
                response.statusMessage = message;
                response.message = message;
                observer.next({
                    statusCode: response.statusCode,
                    message: response.message,
                    data: undefined,
                });
                observer.complete();
            })),
        );
    }
}