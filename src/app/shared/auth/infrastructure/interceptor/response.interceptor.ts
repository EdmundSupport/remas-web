import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, finalize, filter, take } from 'rxjs/operators';
import { AuthService } from 'src/app/datasource/remas/application/service/auth.service';
import { AuthHelper } from 'src/app/datasource/remas/application/helper/auth.helper';
import { TokenHelper } from 'src/app/datasource/remas/application/helper/token.helper';
import { Router } from '@angular/router';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private authService: AuthService,
        private routerService: Router,
        private tokenHelper: TokenHelper,
    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const tokenRefresh = this.tokenHelper.onGetTokenRefresh();
        // this.tokenHelper.onRemoveTokenAccess();
        // this.tokenHelper.onRemoveTokenRefresh();
        // this.authService.onLogout(tokenAccess);
        // this.routerService.navigate(['auth/log-in']);
        // Intenta realizar la solicitud original
        return next.handle(req).pipe(
            catchError((error) => {
                const urlsExclude = [
                    'auth/refresh',
                    'auth/logout',
                ];
                const isUrlExcluded = urlsExclude.reduce((isUrlExcluded, urlExclude) => isUrlExcluded ? isUrlExcluded : error.url.indexOf(urlExclude) != -1, false);
                if (error.status === 401 && !isUrlExcluded) {
                    return this.authService.onRefresh(tokenRefresh).pipe(
                        switchMap((result) => {
                            const tokenNew = result?.data?.tokenAccess;
                            this.tokenHelper.onSetTokenAccess(tokenNew);
                            const authToken = this.tokenHelper.onGetTokenAccess();

                            if (authToken) {
                                req = req.clone({
                                    setHeaders: {
                                        Authorization: `Bearer ${authToken}`,
                                    },
                                });
                            }
                            return next.handle(req);
                        }),
                        catchError((error) => {
                            const authToken = this.tokenHelper.onGetTokenAccess();
                            this.tokenHelper.onRemoveTokenAccess();
                            this.tokenHelper.onRemoveTokenRefresh();
                            this.authService.onLogout(authToken);
                            this.routerService.navigate(['auth/log-in']);
                            return throwError(error);
                        })
                    )
                }
                return throwError(error);
            })
        );
    }
}
