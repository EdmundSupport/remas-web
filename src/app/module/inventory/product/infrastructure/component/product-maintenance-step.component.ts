import {
    Component, ElementRef, EventEmitter, Input, Output, Renderer2,
} from '@angular/core';
import { ProductMaintenanceStepDetailInterface } from 'src/app/datasource/remas/domain/interface/product-maintenance-step-detail.interface';
import { ProductMaintenanceStepInterface } from 'src/app/datasource/remas/domain/interface/product-maintenance-step.interface';

@Component({
    selector: 'app-product-maintenance-step',
    templateUrl: '../page/product-maintenance-step.page.html',
    styleUrls: ['../style/product-maintenance-step.style.scss'],
})
export class ProductMaintenanceStepComponent {
    @Output('onDelete') onDelete = new EventEmitter();
    @Output('onChange') onChange = new EventEmitter();
    @Output('onLoad') onLoad = new EventEmitter();
    @Input('detail') detail: Partial<ProductMaintenanceStepInterface> = {
        uuid: '',
        order: '',
        description: '',
        productUuid: '',
        productMaintenanceStepDetails: [],
    };

    panelOpenState = false;

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {

    }

    ngOnInit() {
    }

    ngOnChanges(data: any) {
        this.onChange.emit(this.detail);
    }

    onChangeDetail(index: number, detail: ProductMaintenanceStepDetailInterface) {
        if (this.detail && this.detail.productMaintenanceStepDetails && this.detail.productMaintenanceStepDetails[index]) {
            this.detail.productMaintenanceStepDetails[index] = detail;
            // if (this.total || this.total == 0 || `${this.total}` == 'NaN') {
            //     this.total = this.onTotal();
            // }
        }
    }

    onDeleteDetail(index: number, detail: ProductMaintenanceStepDetailInterface) {
        if (this.detail && this.detail.productMaintenanceStepDetails) {
            this.detail.productMaintenanceStepDetails.splice(index, 1);
            // if (this.total || this.total == 0 || `${this.total}` == 'NaN') this.total = this.onTotal();
        }
    }

    onAddDetail() {
        if (this.detail && this.detail.productMaintenanceStepDetails) this.detail.productMaintenanceStepDetails.push({} as any);
        else this.detail.productMaintenanceStepDetails = [{} as any];

        // this.total = this.onTotal();
    }

    // onAdd(event: any){
    //     this.panelOpenState = true;
    //     console.log("🚀 ~ file: product-maintenance-step.component.ts:36 ~ ProductMaintenanceStepComponent ~ onAdd ~ onAdd:")

    // }
}
