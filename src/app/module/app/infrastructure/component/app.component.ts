import { Component, SimpleChanges } from "@angular/core";
import { AuthService } from "src/app/datasource/remas/application/service/auth.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-page',
    templateUrl: '../page/app.page.html',
    styleUrls: ['../style/app.style.scss']
})
export class AppComponent {
    constructor(
        public authService: AuthService,
        private matSnackBar: MatSnackBar,
    ) { }

    ngOnInit() { }

    onVerify() {
        this.authService.onTokenValid().subscribe((result) => {
            if (result?.statusCode != 200) {
                this.matSnackBar.open(result?.message, 'Cancelar');
            }
        });
    }
}