import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenHelper } from 'src/app/datasource/remas/application/helper/token.helper';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private tokenHelper: TokenHelper) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const authToken = this.tokenHelper.onGetTokenAccess();

        if (authToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
        }

        return next.handle(request);
    }
}
