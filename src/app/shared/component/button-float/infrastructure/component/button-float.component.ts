import { Component, EventEmitter, Input, Output } from "@angular/core";
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
    @Input('position') position: number = 1;
    @Input('iconName') iconName!: string;
    @Output('onClick') onClick = new EventEmitter();
    constructor() { }

    ngOnInit() { }

    click(){
        this.onClick.emit();
    }
} 