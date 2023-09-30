import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: 'root',
})
export class TokenHelper {
    constructor() { }
    onSetTokenAccess(token: string) {
        localStorage.setItem('token-access', token);
    }

    onGetTokenAccess(): string {
        return localStorage.getItem('token-access') ?? '';
    }

    onRemoveTokenAccess() {
        localStorage.removeItem('token-access');
    }

    onSetTokenRefresh(token: string) {
        localStorage.setItem('token-refresh', token);
    }

    onGetTokenRefresh(): string {
        return localStorage.getItem('token-refresh') ?? '';
    }

    onRemoveTokenRefresh() {
        localStorage.removeItem('token-refresh');
    }
}