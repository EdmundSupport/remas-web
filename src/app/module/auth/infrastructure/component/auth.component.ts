import { Component, SimpleChanges } from "@angular/core";
import { AuthService } from "src/app/datasource/remas/application/service/auth.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";
import { TokenHelper } from "src/app/datasource/remas/application/helper/token.helper";

@Component({
    selector: 'auth-page',
    templateUrl: '../page/auth.page.html',
    styleUrls: ['../style/auth.style.scss']
})
export class AuthComponent {
    logIn: { userName: string; userPassword: string } = { userName: '', userPassword: '' };
    constructor(
        private tokenHelper: TokenHelper,
        public authService: AuthService,
        private matSnackBar: MatSnackBar,
        private routerService: Router,
    ) { }

    ngOnInit() { }

    onLogIn() {
        this.authService.onLogIn(this.logIn).subscribe((result) => {
            if (result?.statusCode != 201) this.matSnackBar.open(result?.message, 'Cancelar');
            const { tokenAccess, tokenRefresh } = result?.data;
            this.tokenHelper.onSetTokenAccess(tokenAccess);
            this.tokenHelper.onSetTokenRefresh(tokenRefresh);
            this.routerService.navigate(['']);
        });
    }
}