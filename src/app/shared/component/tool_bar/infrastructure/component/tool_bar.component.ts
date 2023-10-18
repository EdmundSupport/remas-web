import { Component } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from "@angular/router";

@Component({
    selector: 'app-tool-bar',
    templateUrl: '../page/tool_bar.page.html',
    styleUrls: ['../style/tool_bar.style.scss'],
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, MatIconModule],
})
export class ToolBarComponent {
    constructor(
        private router: Router
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
}