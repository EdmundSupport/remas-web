import {
    Component, ElementRef, EventEmitter, Input, Output, Renderer2,
} from '@angular/core';
import { MaintenanceStepDetailInterface } from 'src/app/datasource/remas/domain/interface/maintenance-step-detail.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MeasureUnitInterface } from 'src/app/datasource/remas/domain/interface/measure-unit.interface';
import { MeasureUnitService } from 'src/app/datasource/remas/application/service/measure-unit.service';
import { ProductInterface } from 'src/app/datasource/remas/domain/interface/product.interface';
import { ProductService } from 'src/app/datasource/remas/application/service/product.service';

@Component({
    selector: 'app-maintenance-step-detail',
    templateUrl: '../page/maintenance-step-detail.page.html',
    styleUrls: ['../style/maintenance-step-detail.style.scss'],
})
export class MaintenanceStepDetailComponent {
    @Input('detail') detail: Partial<MaintenanceStepDetailInterface> = {
        amount: '',
        price: '',
        productUuid: '',
        measureUnitUuid: '',
    };

    amount!: string;
    price!: string

    product!: ProductInterface;
    products: ProductInterface[] = [];
    productTimer: any;

    measureUnit!: MeasureUnitInterface;
    measureUnits: MeasureUnitInterface[] = [];
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
        this.amount = this.detail.amount!;
        this.price = this.detail.price!;
        if(this.detail.measureUnitUuid){
            this.onLoadMeasureUnit({uuid: this.detail.measureUnitUuid}).add(()=>{
                const measureUnit = this.measureUnits.find((measureUnit)=>measureUnit.uuid == this.detail.measureUnitUuid);
                this.measureUnit = measureUnit!;
            });
            this.onLoadProduct({uuid: this.detail.productUuid}).add(()=>{
                const product = this.products.find((product)=>product.uuid == this.detail.productUuid);
                this.product = product!;
            });
        }
        console.log("🚀 ~ file: maintenance-step-detail.component.ts:44 ~ MaintenanceStepDetailComponent ~ ngOnInit ~ this.detail:", this.detail)
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
                this.measureUnits = result;
            });
    }

    onShowMeasureUnit(measureUnit: MeasureUnitInterface) {
        return measureUnit?.name ?? '';
    }
    // endregion Autocomplete MeasureUnit
}
