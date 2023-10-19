import { Component } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from "@angular/router";
import { TokenHelper } from "src/app/datasource/remas/application/helper/token.helper";
import { AuthService } from "src/app/datasource/remas/application/service/auth.service";

@Component({
    selector: 'app-tool-bar',
    templateUrl: '../page/tool_bar.page.html',
    styleUrls: ['../style/tool_bar.style.scss'],
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, MatIconModule],
})
export class ToolBarComponent {
    constructor(
        private router: Router,
        private tokenHelper: TokenHelper,
        private authService: AuthService,
    ) { }

    ngOnInit() {
    }

    goBack() {
        const routeConfigParent = this.router.config[0];
        const routeParent = routeConfigParent?.path;
        this.router.navigate([routeParent]);
    }

    goHome() {
        this.router.navigate(['app']);
    }

    logout() {
        const authToken = this.tokenHelper.onGetTokenAccess();
        this.tokenHelper.onRemoveTokenAccess();
        this.tokenHelper.onRemoveTokenRefresh();
        this.authService.onLogout(authToken);
        this.router.navigate(['auth/log-in']);
    }
}