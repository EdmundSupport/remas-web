import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProductService } from "src/app/datasource/remas/application/service/inventory-product.service";
import { MeasureUnitService } from "src/app/datasource/remas/application/service/measure-unit.service";
import { PriceCategoryService } from "src/app/datasource/remas/application/service/price-category.service";
import { MeasureUnitInterface } from "src/app/datasource/remas/domain/interface/measure-unit.interface";
import { PriceCategoryInterface } from "src/app/datasource/remas/domain/interface/price-category.interface";
import { ProductPriceInterface } from "src/app/datasource/remas/domain/interface/product-price.interface";
import { ProductInterface } from "src/app/datasource/remas/domain/interface/product.interface";

@Component({
    selector: 'app-product-price',
    templateUrl: '../page/product-price.page.html',
    // styleUrls: ['../style/product-price.style.scss'],
})
export class ProductPriceComponent {
    @Input('used') used: ProductPriceInterface[] | undefined;
    @Input('detail') detail!: ProductPriceInterface;
    @Output('onDelete') onDelete = new EventEmitter();
    @Output('onChange') onChange = new EventEmitter<Partial<ProductPriceInterface>>();

    measureUnit!: MeasureUnitInterface;
    measureUnits: MeasureUnitInterface[] = [];
    measureUnitTimer: any;

    priceCategory!: PriceCategoryInterface;
    priceCategories: PriceCategoryInterface[] = [];
    priceCategoryTimer: any;

    constructor(
        private matSnackBar: MatSnackBar,
        private measureUnitService: MeasureUnitService,
        private productService: ProductService,
        private priceCategoryService: PriceCategoryService,
    ) { }

    ngOnInit(){
        if(this.detail.priceCategoryUuid){
            this.onLoadPriceCategory({uuid: this.detail.priceCategoryUuid}).add(()=>{
                const priceCategory = this.priceCategories.find((priceCategory)=>priceCategory.uuid == this.detail.priceCategoryUuid);
                this.priceCategory = priceCategory!;
            })
        }

        if(this.detail.measureUnitUuid){
            this.onLoadMeasureUnit({uuid: this.detail.measureUnitUuid}).add(()=>{
                const measureUnit = this.measureUnits.find((measureUnit)=>measureUnit.uuid == this.detail.measureUnitUuid);
                this.measureUnit = measureUnit!;
            })
        }
    }

    delete() {
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
        const payload = { pagination: { offset: 0, limit: 5 } };
        Object.assign(payload, filter);
        return this.measureUnitService.onFind(payload)
            .subscribe((data) => this.measureUnits = data);
    }

    onShowMeasureUnit(measureUnit: MeasureUnitInterface) {
        return measureUnit?.name ?? '';
    }
    // endregion Autocomplete MeasureUnit

    // region Autocomplete PriceCategory
    onChangePriceCategory(textPriceCategory: string) {
        const price = Number(textPriceCategory);
        if (`${price}` != 'NaN') {
            this.detail.amount = `${price}`;
        }

        if (this.priceCategoryTimer) clearTimeout(this.priceCategoryTimer);

        this.priceCategoryTimer = setTimeout(() => {
            if (textPriceCategory) {
                this.onLoadPriceCategory({ name: textPriceCategory }).add(()=>{
                    if(this.used) this.priceCategories = this.priceCategories.filter((price) => !this.used!.find((priceUsed) => priceUsed.priceCategoryUuid == price.uuid));
                    
                });
            }
        }, 400);
    }

    onSelectPriceCategory(priceCategory: PriceCategoryInterface) {
        this.priceCategory = priceCategory;
        this.detail.priceCategoryUuid = this.priceCategory.uuid;
    }

    onLoadPriceCategory(filter: Partial<PriceCategoryInterface>) {
        const payload = { pagination: { offset: 0, limit: 5 }, condition: true, ...filter };
        Object.assign(payload, filter);
        return this.priceCategoryService.onFind(payload)
            .subscribe((data: PriceCategoryInterface[]) => {
                this.priceCategories = data;
            });
    }

    onShowPriceCategory(priceCategory: PriceCategoryInterface) {
        return priceCategory?.name ?? '';
    }
    // endregion Autocomplete PriceCategory
}