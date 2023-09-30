import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthHelper } from 'src/app/datasource/remas/application/helper/auth.helper';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard {
    constructor(
        private authHelper: AuthHelper,
        private router: Router,
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const url = state.url;
        const isLoggedIn = url.indexOf('/auth/log-in') != -1;
        const isAuthenticated = this.authHelper.onIsAuthenticated();
        if (isAuthenticated && isLoggedIn) return this.router.navigate(['']);
        if (!isAuthenticated && !isLoggedIn) return this.router.navigate(['auth/log-in']);
        return true;
    }
}
