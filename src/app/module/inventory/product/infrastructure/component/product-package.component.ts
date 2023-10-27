import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProductService } from "src/app/datasource/remas/application/service/inventory-product.service";
import { MeasureUnitService } from "src/app/datasource/remas/application/service/measure-unit.service";
import { PriceCategoryService } from "src/app/datasource/remas/application/service/price-category.service";
import { MeasureUnitInterface } from "src/app/datasource/remas/domain/interface/measure-unit.interface";
import { PriceCategoryInterface } from "src/app/datasource/remas/domain/interface/price-category.interface";
import { ProductPackageInterface } from "src/app/datasource/remas/domain/interface/product-package.interface";
import { ProductInterface } from "src/app/datasource/remas/domain/interface/product.interface";

@Component({
    selector: 'app-product-package',
    templateUrl: '../page/product-package.page.html',
    // styleUrls: ['../style/product-package.style.scss'],
})
export class ProductPackageComponent {
    @Input('detail') detail!: ProductPackageInterface;
    @Output('onDelete') onDelete = new EventEmitter();

    measureUnit!: MeasureUnitInterface;
    measureUnits: MeasureUnitInterface[] = [];
    measureUnitTimer: any;

    product!: ProductInterface;
    products: ProductInterface[] = [];
    productTimer: any;

    priceCategory!: PriceCategoryInterface;
    priceCategories: PriceCategoryInterface[] = [];
    priceCategoryTimer: any;

    constructor(
        private matSnackBar: MatSnackBar,
        private measureUnitService: MeasureUnitService,
        private productService: ProductService,
        private priceCategoryService: PriceCategoryService,
    ) { }

    delete(){
        this.onDelete.emit();
    }

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
        if(!this.product?.uuid){
            this.matSnackBar.open(`Debes seleccionar un producto para poder elegir la unidad de medida.`, `OK`);
            return;
        }
        const payload = { pagination: { offset: 0, limit: 5 } };
        Object.assign(payload, filter);
        return this.measureUnitService.onFind(payload)
            .subscribe((data) => this.measureUnits = data);
    }

    onShowMeasureUnit(measureUnit: MeasureUnitInterface) {
        return measureUnit?.name ?? '';
    }
    // endregion Autocomplete MeasureUnit

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
        this.detail.measureUnitUuid = undefined!;
        this.detail.priceCategoryUuid = undefined!;
    }

    onLoadProduct(filter: Partial<ProductInterface>) {
        const payload = { pagination: { offset: 0, limit: 5 } };
        Object.assign(payload, filter);
        return this.productService.onFind(payload)
            .subscribe((data) => this.products = data);
    }

    onShowProduct(product: ProductInterface) {
        return product?.name ?? '';
    }
    // endregion Autocomplete Product

    // region Autocomplete PriceCategory
    onChangePriceCategory(textPriceCategory: string) {
        const price = Number(textPriceCategory);
        if(`${price}` != 'NaN'){
            this.detail.price = `${price}`;
        }

        if (this.priceCategoryTimer) clearTimeout(this.priceCategoryTimer);

        this.priceCategoryTimer = setTimeout(() => {
            if (textPriceCategory) {
                this.onLoadPriceCategory({ name: textPriceCategory });
            }
        }, 400);
    }

    onSelectPriceCategory(priceCategory: PriceCategoryInterface) {
        console.log("🚀 ~ file: product-package.component.ts:123 ~ ProductPackageComponent ~ onSelectPriceCategory ~ priceCategory:", priceCategory)
        this.priceCategory = priceCategory;
        this.detail.priceCategoryUuid = this.priceCategory.uuid;
        const price = Number(priceCategory!.productPrices![0]!.amount!);
        if(`${price}` != 'NaN'){
            this.detail.price = `${price}`;
        }
    }

    onLoadPriceCategory(filter: Partial<PriceCategoryInterface>) {
        if(!this.product?.uuid){
            this.matSnackBar.open(`Debes seleccionar un producto para poder elegir el precio.`, `OK`);
            return;
        }
        const payload = { pagination: { offset: 0, limit: 5 }, productPrices: [{productUuid: this.product.uuid, condition: true }] as any };
        Object.assign(payload, filter);
        return this.priceCategoryService.onFind(payload)
            .subscribe((data) => this.priceCategories = data);
    }

    onShowPriceCategory(priceCategory: PriceCategoryInterface) {
        return priceCategory?.name ?? '';
    }

    onShowPriceCategorySelected(priceCategory: PriceCategoryInterface){
        return (priceCategory?.productPrices && priceCategory.productPrices[0]?.amount) ?? priceCategory?.name ?? '';
    }
    // endregion Autocomplete PriceCategory
}