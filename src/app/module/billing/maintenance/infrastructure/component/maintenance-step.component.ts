import {
    Component, ElementRef, EventEmitter, Input, Output, Renderer2,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/datasource/remas/application/service/product.service';
import { MaintenanceStepInterface } from 'src/app/datasource/remas/domain/interface/maintenance-step.interface';

@Component({
    selector: 'app-maintenance-step',
    templateUrl: '../page/maintenance-step.page.html',
    styleUrls: ['../style/maintenance-step.style.scss'],
})
export class MaintenanceStepComponent {
    @Output('onDelete') onDelete = new EventEmitter();
    @Output('onLoad') onLoad = new EventEmitter();

    @Input('detail') detail: Partial<MaintenanceStepInterface> = {
        order: '',
        description: '',
        maintenanceStepDetails: []
    };

    order!: string;
    description!: string;

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private productService: ProductService,
        private matSnackBar: MatSnackBar,
    ) {

    }

    ngOnInit() {
        this.order = this.detail.order!;
        this.description = this.detail.description!;
        console.log("🚀 ~ file: maintenance-step.component.ts:34 ~ MaintenanceStepComponent ~ ngOnInit ~ this.detail:", this.detail)
    }
}
