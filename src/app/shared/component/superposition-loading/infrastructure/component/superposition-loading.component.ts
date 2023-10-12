import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-superposition-loading',
    templateUrl: '../page/superposition-loading.page.html',
    styleUrls: ['../style/superposition-loading.style.scss'],
    standalone: true,
})
export class SuperpositionLoadingComponent {
    constructor() { }

    ngOnInit() { }
} 