import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ConfirmRequestService } from '../../application/service/confirm-request.service';

@Injectable()
export class ConfirmRequestInterceptor implements HttpInterceptor {
    constructor(
        private dialogService: ConfirmRequestService,
    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                switchMap((result: any) => {
                    const body = result.body as { statusCode: number, message: string, data: any, options?: { confirmUuid: string } }
                    if (body?.statusCode === 202) {
                        return new Observable<HttpEvent<any>>((observer) => {
                            const message = JSON.parse(body?.message);
                            console.log("🚀 ~ file: confirm-request.interceptor.ts:31 ~ ConfirmRequestInterceptor ~ switchMap ~ message:", message)
                            this.dialogService.openDialog(message).subscribe(resultDialog => {
                                if (resultDialog) {
                                    req = req.clone({
                                        setHeaders: {
                                            confirmUuid: `${body.data?.confirmUuid ?? ''}`,
                                        },
                                    });
                                    next.handle(req).subscribe((result) => {
                                        observer.next(req as any);
                                        observer.complete();
                                    });
                                } else {
                                    console.log("🚀 ~ file: confirm-request.interceptor.ts:41 ~ ConfirmRequestInterceptor ~ this.dialogService.openDialog ~ req:", req)
                                    observer.next(result);
                                    observer.complete();
                                }
                            })

                        });
                    }

                    return new Observable<HttpEvent<any>>((observer) => {
                        console.log("🚀 ~ file: confirm-request.interceptor.ts:50 ~ ConfirmRequestInterceptor ~ switchMap ~ req:", req)
                        observer.next(result);
                        observer.complete();
                    })
                }),
            );
    }
}
