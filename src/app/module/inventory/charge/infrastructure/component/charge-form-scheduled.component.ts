import {
    Component, ElementRef, EventEmitter, Input, Output, Renderer2,
} from '@angular/core';
import { ProductInterface } from 'src/app/datasource/remas/domain/interface/product.interface';
import { MeasureUnitInterface } from 'src/app/datasource/remas/domain/interface/measure-unit.interface';
import { PriceCategoryInterface } from 'src/app/datasource/remas/domain/interface/price-category.interface';
import { ProductPriceInterface } from 'src/app/datasource/remas/domain/interface/product-price.interface';
import { ChargeDetailScheduledInterface } from 'src/app/datasource/remas/domain/interface/charge-detail-scheduled.interface';
import { PriceCategoryService } from 'src/app/datasource/remas/application/service/price-category.service';
import { MeasureUnitService } from 'src/app/datasource/remas/application/service/measure-unit.service';
import { ProductService } from 'src/app/datasource/remas/application/service/inventory-product.service';
import { ClientInterface } from 'src/app/datasource/remas/domain/interface/client.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChargeDetailInterface } from 'src/app/datasource/remas/domain/interface/charge-detail.interface';

@Component({
    selector: 'app-charge-form-scheduled',
    templateUrl: '../page/charge-form-scheduled.page.html',
    styleUrls: ['../style/charge-form-scheduled.style.scss'],
})
export class ChargeFormScheduledComponent {
    @Output('onDelete') onDelete = new EventEmitter();
    @Output('onChange') onChange = new EventEmitter();
    @Output('onLoad') onLoad = new EventEmitter();
    @Input('detail') detail: Partial<ChargeDetailScheduledInterface> = {
        amount: '',
        price: '',
        productUuid: '',
        measureUnitUuid: '',
        chargeDetails: []
    };

    products: ProductInterface[] = [];
    product!: ProductInterface;
    productLoadFirst: boolean = false;
    productTimer: any;

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

    onAddDetail() {
        if (this.detail && this.detail.chargeDetails) this.detail.chargeDetails.push({} as any);
        else this.detail.chargeDetails = [{} as any];

    }

    onChangeDetail(index: number, detail: ChargeDetailInterface) {
        if (this.detail && this.detail.chargeDetails && this.detail.chargeDetails[index]) {
            this.detail.chargeDetails[index] = detail;
            
        }

    }

    // region Autocomplete Product
    onChangeProduct(textProduct: string) {
        // this.detail.description = textProduct;
        this.onChange.emit(this.detail);
        if (this.productTimer) clearTimeout(this.productTimer);

        this.productTimer = setTimeout(() => {
            if (textProduct) {
                this.onLoadProduct({ name: textProduct })
            }
        }, 400);
    }

    onSelectProduct(product: ProductInterface) {
        this.product = product;
        this.detail.productUuid = this.product.uuid!;
        this.onChange.emit(this.detail);
    }

    onLoadProduct(filter: Partial<ProductInterface>) {
        const payload = { pagination: { offset: 0, limit: 5 } };
        Object.assign(payload, filter);
        return this.productService.onFind(payload)
            .subscribe((result) =>{ 
                if (result?.statusCode && result?.statusCode != 200) {
                    this.matSnackBar.open(result?.message ?? 'Ocurrio un error al filtrar el servidor.');
                    return;
                }
                this.products = result;
            });
    }

    onShowProduct(product: ProductInterface) {
        return (product && product.name) ? product.name : '';
    }
    // endregion Autocomplete Product

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
        const price = Number.isNaN(this.detail.price) ? 0 : Number(this.detail.price);
        return amount * price;
    }

    delete() {
        if (this.onDelete) this.onDelete.emit(this.detail);
    }
}
