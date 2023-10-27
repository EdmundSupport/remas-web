import {
    Component, ElementRef, EventEmitter, Input, Output, Renderer2,
} from '@angular/core';
import { ProductInterface } from 'src/app/datasource/remas/domain/interface/product.interface';
import { MeasureUnitInterface } from 'src/app/datasource/remas/domain/interface/measure-unit.interface';
import { PriceCategoryInterface } from 'src/app/datasource/remas/domain/interface/price-category.interface';
import { ProductPriceInterface } from 'src/app/datasource/remas/domain/interface/product-price.interface';
import { ChargeDetailInterface } from 'src/app/datasource/remas/domain/interface/charge-detail.interface';
import { PriceCategoryService } from 'src/app/datasource/remas/application/service/price-category.service';
import { MeasureUnitService } from 'src/app/datasource/remas/application/service/measure-unit.service';
import { ProductService } from 'src/app/datasource/remas/application/service/inventory-product.service';
import { ClientInterface } from 'src/app/datasource/remas/domain/interface/client.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-charge-form-detail',
    templateUrl: '../page/charge-form-detail.page.html',
    styleUrls: ['../style/charge-form-detail.style.scss'],
})
export class ChargeFormDetailComponent {
    @Output('onDelete') onDelete = new EventEmitter();
    @Output('onChange') onChange = new EventEmitter();
    @Output('onLoad') onLoad = new EventEmitter();
    @Input('detail') detail!: ChargeDetailInterface;

    measuresUnit: MeasureUnitInterface[] = [];
    measureUnit!: MeasureUnitInterface;
    measureUnitTimer: any;

    constructor(
        private productService: ProductService,
        private measureUnitService: MeasureUnitService,
        private priceCategoryService: PriceCategoryService,
        private matSnackBar: MatSnackBar,
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {

    }

    ngOnInit() {
        if (this.detail) {
            // if (this.detail.description) this.product = { name: this.detail.description } as any;
            // if (this.detail.productUuid) this.onLoadProduct({ uuid: this.detail.productUuid, pagination: { offset: 0, limit: 100 } })
            //     .add(() => {
            //         this.product = {name: this.detail.description} as any;
            //     });

            if (this.detail.measureUnitUuid) this.onLoadMeasureUnit({ uuid: this.detail.measureUnitUuid, pagination: { offset: 0, limit: 100 } })
                .add(() => {
                    this.measureUnit = this.measuresUnit.find((measureUnit) => measureUnit.uuid == this.detail.measureUnitUuid)!;
                });

            // if (this.detail.priceCategoryUuid) this.onLoadPriceCategory({ productPrices: [{ uuid: this.detail.priceCategoryUuid } as any], pagination: { offset: 0, limit: 100 } })
            //     .add(() => {
            //         this.priceCategory = this.pricesCategory.find((priceCategory) => priceCategory.uuid == this.detail.priceCategoryUuid)!;
            //     });
        }
    }

    ngAfterContentInit() {
        // const inputDescription = this.elementRef.nativeElement.querySelector('#inputDescription');
        // this.renderer.setProperty(inputDescription, 'value', 'asd')
        // this.product = '' as any;
    }

    ngAfterViewInit() {
        this.onLoad.emit();
    }

    ngOnChanges(data: any) {
        this.onChange.emit(this.detail);
    }

    // region Autocomplete Measure Unit
    onChangeMeasureUnit(textMeasureUnit: string) {
        if (this.measureUnitTimer) clearTimeout(this.measureUnitTimer);

        this.measureUnitTimer = setTimeout(() => {
            if (textMeasureUnit) {
                this.onLoadMeasureUnit({ name: textMeasureUnit })
            }
        }, 400);
    }

    onSelectMeasureUnit(measureUnit: MeasureUnitInterface) {
        this.measureUnit = measureUnit;
        this.detail.measureUnitUuid = this.measureUnit.uuid;
        this.onChange.emit(this.detail);
    }

    onLoadMeasureUnit(filter: Partial<MeasureUnitInterface>) {
        const payload = { pagination: { offset: 0, limit: 5 } };
        Object.assign(payload, filter);
        return this.measureUnitService.onFind(payload)
            .subscribe((data) => this.measuresUnit = data);
    }

    onShowMeasureUnit(measureUnit: MeasureUnitInterface) {
        return (measureUnit && measureUnit.name) ? measureUnit.name : '';
    }
    // endregion Autocomplete Measure Unit

    onImporteSum() {
        const amount = Number.isNaN(this.detail.amount) ? 0 : Number(this.detail.amount);
        return amount;
    }

    delete() {
        if (this.onDelete) this.onDelete.emit(this.detail);
    }
}