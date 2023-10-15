import {
    Component, ElementRef, EventEmitter, Input, Output, Renderer2,
} from '@angular/core';
import { ProductMaintenanceStepDetailInterface } from 'src/app/datasource/remas/domain/interface/product-maintenance-step-detail.interface';
import { ProductService } from '../../../../../datasource/remas/application/service/product.service';
import { ProductInterface } from 'src/app/datasource/remas/domain/interface/product.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MeasureUnitInterface } from 'src/app/datasource/remas/domain/interface/measure-unit.interface';
import { MeasureUnitService } from 'src/app/datasource/remas/application/service/measure-unit.service';

@Component({
    selector: 'app-product-maintenance-step-detail',
    templateUrl: '../page/product-maintenance-step-detail.page.html',
    styleUrls: ['../style/product-maintenance-step-detail.style.scss'],
})
export class ProductMaintenanceStepDetailComponent {
    @Output('onDelete') onDelete = new EventEmitter();
    @Output('onChange') onChange = new EventEmitter();
    @Output('onLoad') onLoad = new EventEmitter();
    @Input('detail') detail: Partial<ProductMaintenanceStepDetailInterface> = {
        uuid: '',
        amount: '',
        price: '',
        productMaintenanceStepUuid: '',
        productUuid: '',
        measureUnitUuid: '',
        condition: false
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
        private productService: MeasureUnitService,
        private measureUnitService: MeasureUnitService,
    ) {

    }

    ngOnInit() {
        if (this.detail) {
            if (this.detail.productUuid) this.onLoadProduct({ uuid: this.detail.productUuid })
                .add(() => {
                    this.product = this.products.find((product) => product.uuid == this.detail.productUuid)!;
                });

            if (this.detail.measureUnitUuid) this.onLoadProduct({ uuid: this.detail.measureUnitUuid })
                .add(() => {
                    this.measureUnit = this.measuresUnit.find((measureUnit) => measureUnit.uuid == this.detail.measureUnitUuid)!;
                });
        }

    }

    delete() {
        if (this.onDelete) this.onDelete.emit(this.detail);
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

    ngOnChanges(data: any) {
        this.onChange.emit(this.detail);
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
