import { Component, Input } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-button-float',
    templateUrl: '../page/button-float.page.html',
    styleUrls: ['../style/button-float.style.scss'],
    standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule,
    ]
})
export class ButtonFloatComponent {
    @Input() iconName!: string;
    @Input() onClick: () => void = (() => false);
    constructor() { }

    ngOnInit() { }
} 