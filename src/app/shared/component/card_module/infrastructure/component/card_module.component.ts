import { Component, Input } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from "@angular/router";
import { AuthHelper } from "src/app/datasource/remas/application/helper/auth.helper";

@Component({
    selector: 'app-card-module',
    templateUrl: '../page/card_module.page.html',
    styleUrls: ['../style/card_module.style.scss'],
    standalone: true,
    imports: [MatCardModule, MatButtonModule],
})
export class CardModuleComponent {
    @Input('description') description!: string;
    @Input('title') title!: string;
    @Input('url') url!: string;

    constructor(
        private router: Router,
    ) { }

    ngOnInit() { }

    onGo(){
        if(this.url) this.router.navigate([this.url]);
    }
}