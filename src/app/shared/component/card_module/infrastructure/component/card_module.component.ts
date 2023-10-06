import { Component } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-card-module',
    templateUrl: '../page/card_module.page.html',
    styleUrls: ['../style/card_module.style.scss'],
    standalone: true,
    imports: [MatCardModule, MatButtonModule],
})
export class CardModuleComponent {
    constructor() { }

    ngOnInit() { }
}