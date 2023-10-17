import {
    Component, ElementRef, EventEmitter, Input, Output, Renderer2,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/datasource/remas/application/service/product.service';
import { MaintenanceStepInterface } from 'src/app/datasource/remas/domain/interface/maintenance-step.interface';
import { ProductMaintenanceStepDetailInterface } from 'src/app/datasource/remas/domain/interface/product-maintenance-step-detail.interface';
import { ProductMaintenanceStepInterface } from 'src/app/datasource/remas/domain/interface/product-maintenance-step.interface';
import { ProductInterface } from 'src/app/datasource/remas/domain/interface/product.interface';

@Component({
    selector: 'app-maintenance-step',
    templateUrl: '../page/maintenance-step.page.html',
    styleUrls: ['../style/maintenance-step.style.scss'],
})
export class MaintenanceStepComponent {
    @Output('onDelete') onDelete = new EventEmitter();
    @Output('onChange') onChange = new EventEmitter();
    @Output('onLoad') onLoad = new EventEmitter();

    @Input('detail') detail: Partial<ProductMaintenanceStepInterface> = {
        uuid: '',
        order: '',
        description: '',
        productUuid: '',
        productMaintenanceStepDetails: [],
        maintenanceSteps: []
    };

    maintenanceStepUuid!: string;
    panelOpenState = false;

    // product!: ProductInterface;
    // products: ProductInterface[] = [];
    // productTimer: any;

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private productService: ProductService,
        private matSnackBar: MatSnackBar,
    ) {

    }

    ngOnInit() {
        if (this.detail?.maintenanceSteps) {
            const maintenanceStep = this.detail.maintenanceSteps.find((maintenanceStep) => maintenanceStep.productMaintenanceStepUuid == this.detail.uuid);
            if (maintenanceStep)
                this.maintenanceStepUuid = maintenanceStep.uuid;
        }
        if (this.detail.productMaintenanceStepDetails && this.detail.productMaintenanceStepDetails?.length > 0)
            this.detail.condition = undefined;
        else if (this.detail.maintenanceSteps && this.detail.maintenanceSteps.length == 0) {
            this.detail.condition = false;
        }
        else this.detail.condition = undefined;
    }

    ngOnChanges() {
        this.onChange.emit(this.detail);
    }

    onProgress() {
        // const detailBaseCount = this.detail?.productMaintenanceStepDetails?.length ?? 0;
        // const detailUsedCount = this.detail?.maintenanceStep![0].maintenanceStepDetails?.length ?? 0;
        // const percentage = (detailUsedCount*100)/detailBaseCount;
        return 70;
    }

    onComplete(event: any) {
        this.detail.condition = event.checked;
        this.ngOnChanges();
    }

    onChangeDetail(index: number, detail: ProductMaintenanceStepDetailInterface) {
        if (this.detail && this.detail.productMaintenanceStepDetails && this.detail.productMaintenanceStepDetails[index]) {
            this.detail.productMaintenanceStepDetails[index] = detail;
            // if (this.total || this.total == 0 || `${this.total}` == 'NaN') {
            //     this.total = this.onTotal();
            // }
        }
        this.ngOnChanges();
    }

    onDeleteDetail(index: number, detail: ProductMaintenanceStepDetailInterface) {
        if (this.detail && this.detail.productMaintenanceStepDetails) {
            this.detail.productMaintenanceStepDetails.splice(index, 1);
            // if (this.total || this.total == 0 || `${this.total}` == 'NaN') this.total = this.onTotal();
        }
    }

    // onAddDetail() {
    //     if (this.detail && this.detail.productMaintenanceStepDetails) this.detail.productMaintenanceStepDetails.push({ maintenanceMaintenanceStepUuid: this?.detail?.uuid } as any);
    //     else this.detail.productMaintenanceStepDetails = [{ maintenanceMaintenanceStepUuid: this?.detail?.uuid } as any];

    //     // this.total = this.onTotal();
    // }

    onAdd(event: any) {
        this.panelOpenState = true;

    }
}
