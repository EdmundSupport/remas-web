import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment";
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from "ngx-cookie-service";
import { TokenHelper } from "../helper/token.helper";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    refreshToken() {
        throw new Error('Method not implemented.');
    }
    url = environment.apiAuth;
    onValidTokenLoading$ = new BehaviorSubject<boolean>(false);
    onLogInLoading$ = new BehaviorSubject<boolean>(false);
    onRefreshLoading$ = new BehaviorSubject<boolean>(false);
    onLogoutLoading$ = new BehaviorSubject<boolean>(false);

    constructor(
        private httpService: HttpClient,
        private tokenHelper: TokenHelper,
    ) { }

    onTokenValid(): Observable<any> {
        this.onValidTokenLoading$.next(true);
        return this.httpService.get(this.url + '/v1/auth/token-valid').pipe(
            // catchError((result) => new Observable(observer => {
            //     observer.next(result?.error);
            //     observer.complete();
            // })),
            finalize(() => {
                this.onValidTokenLoading$.next(false);
            })
        );
    }

    onLogIn(data: { userName: string; userPassword: string }): Observable<any> {
        this.onLogInLoading$.next(true);
        return this.httpService.post(this.url + '/v1/auth/log-in', data).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            })),
            finalize(() => {
                this.onLogInLoading$.next(false);
            })
        );
    }

    onRefresh(tokenRefresh: string): Observable<any> {
        this.onRefreshLoading$.next(true);
        return this.httpService.get(this.url + '/v1/auth/refresh', { headers: { "token-refresh": 'Bearer ' + tokenRefresh } }).pipe(
            // catchError((result) => new Observable(observer => {
            //     observer.next(result?.error);
            //     observer.complete();
            // })),
            finalize(() => {
                this.onRefreshLoading$.next(false);
            })
        );
    }

    onLogout(tokenAccess: string): Observable<any> {
        this.onLogoutLoading$.next(true);
        return this.httpService.post(this.url + '/v1/auth/logout', [tokenAccess]).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            })),
            finalize(() => {
                this.onLogoutLoading$.next(false);
            })
        );
    }
}