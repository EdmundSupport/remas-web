import {
    Component, ElementRef, EventEmitter, Input, Output, Renderer2,
} from '@angular/core';
import { MaintenanceStepDetailInterface } from 'src/app/datasource/remas/domain/interface/maintenance-step-detail.interface';
import { MaintenanceService } from '../../../../../datasource/remas/application/service/maintenance.service';
import { MaintenanceInterface } from 'src/app/datasource/remas/domain/interface/maintenance.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MeasureUnitInterface } from 'src/app/datasource/remas/domain/interface/measure-unit.interface';
import { MeasureUnitService } from 'src/app/datasource/remas/application/service/measure-unit.service';
import { ProductInterface } from 'src/app/datasource/remas/domain/interface/product.interface';
import { ProductService } from 'src/app/datasource/remas/application/service/product.service';
import { ProductMaintenanceStepDetailInterface } from 'src/app/datasource/remas/domain/interface/product-maintenance-step-detail.interface';

@Component({
    selector: 'app-maintenance-step-detail',
    templateUrl: '../page/maintenance-step-detail.page.html',
    styleUrls: ['../style/maintenance-step-detail.style.scss'],
})
export class MaintenanceStepDetailComponent {
    @Output('onDelete') onDelete = new EventEmitter();
    @Output('onChange') onChange = new EventEmitter();
    @Output('onLoad') onLoad = new EventEmitter();
    @Input('maintenanceStepUuid') maintenanceStepUuid: string | undefined;
    @Input('detail') detail: Partial<ProductMaintenanceStepDetailInterface> = {
        uuid: '',
        amount: '',
        price: '',
        productMaintenanceStepUuid: '',
        productUuid: '',
        measureUnitUuid: '',
        maintenanceStepDetails: [],
        product: undefined,
        measureUnit: undefined,
    };

    product!: ProductInterface;
    products: ProductInterface[] = [];
    productTimer: any;

    measureUnit!: MeasureUnitInterface;
    measuresUnit: MeasureUnitInterface[] = [];
    measureUnitTimer: any;

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private matSnackBar: MatSnackBar,
        private productService: ProductService,
        private measureUnitService: MeasureUnitService,
    ) {

    }

    ngOnInit() {
        if (this.detail) {
            if(!this.detail.maintenanceStepDetails || this.detail.maintenanceStepDetails.length == 0){
                this.onAddDetail();
            }
            if (this.detail.productUuid)
                this.productService.onFindOne(this.detail.productUuid)
                    .subscribe((result) => {
                        if (result?.statusCode && result?.statusCode != 200) {
                            this.matSnackBar.open(result?.message ?? 'Ocurrio un error al cargar el producto para el label.');
                            return;
                        }
                        if (this.detail) this.detail['product'] = result;
                    });

            if (this.detail.measureUnitUuid)
                this.measureUnitService.onFindOne(this.detail.measureUnitUuid)
                    .subscribe((result) => {
                        if (result?.statusCode && result?.statusCode != 200) {
                            this.matSnackBar.open(result?.message ?? 'Ocurrio un error al cargar la unidad de medida para el label.');
                            return;
                        }
                        if (this.detail) this.detail['measureUnit'] = result;
                    });

            // if (this.detail.measureUnit)
            //     if (this.detail.maintenanceUuid) this.onLoadMaintenance({ uuid: this.detail.maintenanceUuid })
            //         .add(() => {
            //             this.maintenance = this.maintenances.find((maintenance) => maintenance.uuid == this.detail.maintenanceUuid)!;
            //         });

            //     if (this.detail.measureUnitUuid) this.onLoadMeasureUnit({ uuid: this.detail.measureUnitUuid })
            //         .add(() => {
            //             this.measureUnit = this.measuresUnit.find((measureUnit) => measureUnit.uuid == this.detail.measureUnitUuid)!;

            //         });
        }
    }

    delete() {
        if (this.onDelete) this.onDelete.emit(this.detail);
    }

    onAddDetail() {
        if (this.detail && this.detail.maintenanceStepDetails) this.detail.maintenanceStepDetails.push({ maintenanceStepUuid: this.maintenanceStepUuid, productMaintenanceStepDetailUuid: this.detail?.uuid } as any);
        else this.detail.maintenanceStepDetails = [{ maintenanceStepUuid: this.maintenanceStepUuid, productMaintenanceStepDetailUuid: this.detail?.uuid } as any];

        // this.total = this.onTotal();
    }
    onImporteSum() {
        const price = Number(this.detail?.price);
        const amount = Number(this.detail?.amount);
        const sum = (`${price}` == 'NaN' ? 0 : price) * (`${amount}` == 'NaN' ? 0 : amount)
        return sum;
    }

    ngAfterViewInit() {
        this.onLoad.emit();
    }

    ngOnChanges() {
        this.onChange.emit(this.detail);
    }

    onChangeDetail(index: number, detail: MaintenanceStepDetailInterface) {
        if (this.detail && this.detail.maintenanceStepDetails && this.detail.maintenanceStepDetails[index]) {
            this.detail.maintenanceStepDetails[index] = detail;
        }
        this.ngOnChanges();
    }

    // region Autocomplete Product
    onChangeProduct(textProduct: string) {
        if (this.productTimer) clearTimeout(this.productTimer);

        this.productTimer = setTimeout(() => {
            if (textProduct) {
                this.onLoadProduct({ name: textProduct });
            }
        }, 400);
    }

    onSelectProduct(product: ProductInterface) {
        this.product = product;
        this.detail.productUuid = this.product.uuid;
    }

    onLoadProduct(filter: Partial<ProductInterface>) {
        const payload = { pagination: { offset: 0, limit: 5 } };
        Object.assign(payload, filter);
        return this.productService.onFind(payload)
            .subscribe((result) => {
                if (result?.statusCode && result?.statusCode != 200) {
                    this.matSnackBar.open(result?.message ?? 'Ocurrio un error al cargar los productos.');
                    return;
                }
                this.products = result;
            });
    }

    onShowProduct(product: ProductInterface) {
        return product?.name ?? '';
    }
    // endregion Autocomplete Product

    // region Autocomplete MeasureUnit
    onChangeMeasureUnit(textMeasureUnit: string) {
        if (this.measureUnitTimer) clearTimeout(this.measureUnitTimer);

        this.measureUnitTimer = setTimeout(() => {
            if (textMeasureUnit) {
                this.onLoadMeasureUnit({ name: textMeasureUnit });
            }
        }, 400);
    }

    onSelectMeasureUnit(measureUnit: MeasureUnitInterface) {
        this.measureUnit = measureUnit;
        this.detail.measureUnitUuid = this.measureUnit.uuid;
    }

    onLoadMeasureUnit(filter: Partial<MeasureUnitInterface>) {
        const payload = { pagination: { offset: 0, limit: 5 } };
        Object.assign(payload, filter);
        return this.measureUnitService.onFind(payload)
            .subscribe((result) => {
                if (result?.statusCode && result?.statusCode != 200) {
                    this.matSnackBar.open(result?.message ?? 'Ocurrio un error al cargar los measureUnitos.');
                    return;
                }
                this.measuresUnit = result;
            });
    }

    onShowMeasureUnit(measureUnit: MeasureUnitInterface) {
        return measureUnit?.name ?? '';
    }
    // endregion Autocomplete MeasureUnit
}
