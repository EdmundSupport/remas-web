import {
    Component,
} from '@angular/core';
import { ProductInterface } from 'src/app/datasource/remas/domain/interface/product.interface';
import { MeasureUnitInterface } from 'src/app/datasource/remas/domain/interface/measure-unit.interface';
import { PriceCategoryInterface } from 'src/app/datasource/remas/domain/interface/price-category.interface';
import { ProductPriceInterface } from 'src/app/datasource/remas/domain/interface/product-price.interface';
import { QuotationDetailInterface } from 'src/app/datasource/remas/domain/interface/quotation-detail.interface';
import { PriceCategoryService } from 'src/app/datasource/remas/application/service/price-category.service';
import { MeasureUnitService } from 'src/app/datasource/remas/application/service/measure-unit.service';
import { ProductService } from 'src/app/datasource/remas/application/service/product.service';
import { ClientInterface } from 'src/app/datasource/remas/domain/interface/client.interface';

@Component({
    selector: 'app-quotation-form-detail',
    templateUrl: '../page/quotation-form-detail.page.html',
    styleUrls: ['../style/quotation-form-detail.style.scss'],
})
export class QuotationFormDetailComponent {
    detail: Partial<QuotationDetailInterface> = {};

    products: ProductInterface[] = [];
    product!: ProductInterface;
    productTimer: any;

    measuresUnit: MeasureUnitInterface[] = [];
    measureUnit!: MeasureUnitInterface;
    measureUnitTimer: any;

    pricesCategory: PriceCategoryInterface[] = [];
    priceCategory!: PriceCategoryInterface;
    priceCategoryTimer: any;

    constructor(
        private productService: ProductService,
        private measureUnitService: MeasureUnitService,
        private priceCategoryService: PriceCategoryService,
    ) {
    }

    ngOnInit() {
        this.onLoadProduct({ uuid: this.detail.productUuid, pagination: { offset: 0, limit: 100 } })
            .add(() => {
                this.product = this.products.find((product) => product.uuid == this.detail.productUuid)!;
            });

        this.onLoadMeasureUnit({ uuid: this.detail.measureUnitUuid, pagination: { offset: 0, limit: 100 } })
            .add(() => {
                this.measureUnit = this.measuresUnit.find((measureUnit) => measureUnit.uuid == this.detail.measureUnitUuid)!;
            });

        this.onLoadPriceCategory({ productPrices: [{ uuid: this.detail.priceCategoryUuid } as any], pagination: { offset: 0, limit: 100 } })
            .add(() => {
                this.priceCategory = this.pricesCategory.find((priceCategory) => priceCategory.uuid == this.detail.priceCategoryUuid)!;
            });
    }

    // region Autocomplete Product
    onChangeProduct(textProduct: string) {
        this.detail.description = textProduct;
        if (this.productTimer) clearTimeout(this.productTimer);

        this.productTimer = setTimeout(() => {
            if (textProduct) {
                this.onLoadProduct({ name: textProduct })
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
            .subscribe((data) => this.products = data);
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

    // region Autocomplete Price Category
    onChangePriceCategory(textPriceCategory: string) {
        this.detail.price = textPriceCategory;
        if (this.priceCategoryTimer) clearTimeout(this.priceCategoryTimer);

        this.priceCategoryTimer = setTimeout(() => {
            if (textPriceCategory) {
                const productPrices: Partial<ProductPriceInterface>[] = [{
                    productUuid: this.detail.productUuid
                }];

                const filter: Partial<PriceCategoryInterface> = {
                    name: textPriceCategory,
                    productPrices: productPrices as any[],
                };
                this.onLoadPriceCategory(filter as any)
            }
        }, 400);
    }

    onSelectPriceCategory(priceCategory: PriceCategoryInterface) {
        this.priceCategory = priceCategory;
        this.detail.priceCategoryUuid = this.priceCategory.uuid;
    }

    onLoadPriceCategory(filter: Partial<PriceCategoryInterface>) {

        const payload = { pagination: { offset: 0, limit: 5 } };
        Object.assign(payload, filter);
        return this.priceCategoryService.onFind(payload)
            .subscribe((data) => {

                this.pricesCategory = data
            });
    }

    onDisplayPriceCategory(priceCategory: PriceCategoryInterface) {
        const price = (priceCategory && priceCategory.productPrices && priceCategory.productPrices[0]) ?
            priceCategory.productPrices[0].amount : '0.00';
        return price;
    }

    onShowPriceCategory(priceCategory: PriceCategoryInterface) {
        return (priceCategory && priceCategory.name) ? priceCategory.name : '';
    }
    // endregion Autocomplete Price Category

    onImporteSum() {
        return 9999999.99;
    }

    onLogIn() {
    }

    onDelete() {
    }
}
