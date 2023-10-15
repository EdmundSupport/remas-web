import {
    Component, ElementRef,
} from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductInterface } from 'src/app/datasource/remas/domain/interface/product.interface';
import { MeasureInterface } from 'src/app/datasource/remas/domain/interface/measure.interface';
import { MeasureService } from 'src/app/datasource/remas/application/service/measure.service';
import { ProductTypeInterface } from 'src/app/datasource/remas/domain/interface/product-type.interface';
import { ProductTypeService } from 'src/app/datasource/remas/application/service/product-type.service';
import { SerializeHelper } from 'src/app/shared/serialize/application/helper/serialize.helper';
import { ProductService } from 'src/app/datasource/remas/application/service/inventory-product.service';

@Component({
    selector: 'app-product-form',
    templateUrl: '../page/product-form.page.html',
    styleUrls: ['../style/product-form.style.scss'],
})
export class ProductFormComponent {

    product: Partial<ProductInterface> = {
        sku: '',
        name: '',
        description: '',
        // parentUuid: '', // TODO corregir porque no es funcional este campo
        measureUuid: '',
        productTypeUuid: '',
        productPrices: [],
        productMaintenanceSteps: [],
    };

    total!: number;

    onSaveLoading$ = new BehaviorSubject<boolean>(false);
    timeSaveLoading: any;

    measure!: MeasureInterface;
    measures: MeasureInterface[] = [];
    measureTimer: any;

    productType!: ProductTypeInterface;
    productTypes: ProductTypeInterface[] = [];
    productTypeTimer: any;

    constructor(
        private matSnackBar: MatSnackBar,
        private elementRef: ElementRef,
        private router: Router,
        private route: ActivatedRoute,
        private productService: ProductService,
        private measureService: MeasureService,
        private productTypeService: ProductTypeService,
    ) {
        this.product.uuid = this.route.snapshot.paramMap.get('uuid')!;
    }

    ngOnInit() {
        if (SerializeHelper.isUUID(this.product.uuid!)) {
            this.productService.onFindOne(this?.product?.uuid!)
                .subscribe((result) => {
                    if (result?.statusCode && result?.statusCode != 200) {
                        this.matSnackBar.open('Ocurrio un error al obtener el producto.');
                        return;
                    }

                    const product = result;
                    this.product = product;

                    if (this.product.measureUuid) this.onLoadMeasure({ uuid: this.product.measureUuid })
                        .add(() => {
                            this.measure = this.measures.find((measure) => measure.uuid == this.product.measureUuid)!;
                        });
                        
                    if (this.product.productTypeUuid) this.onLoadProductType({ uuid: this.product.productTypeUuid })
                        .add(() => {
                            this.productType = this.productTypes.find((productType) => productType.uuid == this.product.productTypeUuid)!;
                        });

                    // this.total = this.onTotal();
                    this.onStopSaveLoading();
                });
        }
    }

    onStopSaveLoading() {
        this.onSaveLoading$.next(false)
        clearTimeout(this.timeSaveLoading);
    }

    // region Autocomplete Measure
    onChangeMeasure(textMeasure: string) {
        if (this.measureTimer) clearTimeout(this.measureTimer);

        this.measureTimer = setTimeout(() => {
            if (textMeasure) {
                this.onLoadMeasure({ name: textMeasure });
            }
        }, 400);
    }

    onSelectMeasure(measure: MeasureInterface) {
        this.measure = measure;
        this.product.measureUuid = this.measure.uuid;
    }

    onLoadMeasure(filter: Partial<MeasureInterface>) {
        const payload = { pagination: { offset: 0, limit: 5 } };
        Object.assign(payload, filter);
        return this.measureService.onFind(payload)
            .subscribe((data) => this.measures = data);
    }

    onShowMeasure(measure: MeasureInterface) {
        return measure?.name ?? '';
    }
    // endregion Autocomplete Measure

    // region Autocomplete ProductType
    onChangeProductType(textProductType: string) {
        if (this.productTypeTimer) clearTimeout(this.productTypeTimer);

        this.productTypeTimer = setTimeout(() => {
            if (textProductType) {
                this.onLoadProductType({ name: textProductType });
            }
        }, 400);
    }

    onSelectProductType(productType: ProductTypeInterface) {
        this.productType = productType;
        this.product.productTypeUuid = this.productType.uuid;
    }

    onLoadProductType(filter: Partial<ProductTypeInterface>) {
        const payload = { pagination: { offset: 0, limit: 5 } };
        Object.assign(payload, filter);
        return this.productTypeService.onFind(payload)
            .subscribe((data) => this.productTypes = data);
    }

    onShowProductType(productType: ProductTypeInterface) {
        return productType?.name ?? '';
    }
    // endregion Autocomplete ProductType
}
