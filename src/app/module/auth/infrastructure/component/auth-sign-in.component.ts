import { Component, SimpleChanges } from "@angular/core";
import { AuthService } from "src/app/datasource/remas/application/service/auth.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";
import { TokenHelper } from "src/app/datasource/remas/application/helper/token.helper";

@Component({
    selector: 'auth-page-sign-in',
    templateUrl: '../page/auth-sign-in.page.html',
    styleUrls: ['../style/auth.style.scss']
})
export class AuthSignInComponent {
    signIn: {
        nameFirst: string;
        nameSecond?: string;
        nameOther?: string;
        surnameFirst: string;
        surnameSecond?: string;
        surnameOther?: string;
        birthday?: Date;
        password: string;
    } = {
        nameFirst: '',
        nameSecond: '',
        nameOther: '',
        surnameFirst: '',
        surnameSecond: '',
        surnameOther: '',
        birthday: new Date(),
        password: '',
    };

    userName: string = '';

    constructor(
        private tokenHelper: TokenHelper,
        public authService: AuthService,
        private matSnackBar: MatSnackBar,
        private routerService: Router,
    ) { }

    ngOnInit() { }

    onSignIn() {
        this.authService.onSignIn(this.signIn).subscribe((result) => {
            if (result?.statusCode != 201) { this.matSnackBar.open(result?.message, 'Cancelar'); }
            else {
                this.userName = result?.data.name;
                this.matSnackBar.open('Usuario creado con exito.', 'Cancelar');
                // this.routerService.navigate(['']);
            }
        });
    }

    goLogIn() {
        this.routerService.navigate(['auth']);
    }
}