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
import { ProductService } from 'src/app/datasource/remas/application/service/product.service';
import { ProductMaintenanceStepInterface } from 'src/app/datasource/remas/domain/interface/product-maintenance-step.interface';

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

    onChangeDetail(index: number, detail: ProductMaintenanceStepInterface) {
        if (this.product && this.product.productMaintenanceSteps && this.product.productMaintenanceSteps[index]) {
            this.product.productMaintenanceSteps[index] = detail;
            // if (this.total || this.total == 0 || `${this.total}` == 'NaN') {
            //     this.total = this.onTotal();
            // }
        }
    }

    onDeleteDetail(index: number, detail: ProductMaintenanceStepInterface) {
        if (this.product && this.product.productMaintenanceSteps) {
            this.product.productMaintenanceSteps.splice(index, 1);
            // if (this.total || this.total == 0 || `${this.total}` == 'NaN') this.total = this.onTotal();
        }
    }

    onAddDetail() {
        if (this.product && this.product.productMaintenanceSteps) this.product.productMaintenanceSteps.push({ productMaintenanceStepUuid: this?.product?.uuid } as any);
        else this.product.productMaintenanceStepDetails = [{ productMaintenanceStepUuid: this?.product?.uuid } as any];

        // this.total = this.onTotal();
    }

    onSave(): any {
        this.onSaveLoading$.next(true);
        const timeMin = 5;
        const timeMs = 1000 * 60 * timeMin;
        this.timeSaveLoading = setTimeout(() => {
            this.matSnackBar.open(`Se detuvo la operacion, porque se espero mas de ${timeMin} minutos.`);
            this.onSaveLoading$.next(false);
        }, timeMs);

        if (!(this.product && this.product.sku && this.product.sku != ''))
            return this.matSnackBar.open('Debes agregar un SKU.', 'Ok') && this.onStopSaveLoading();

        if (!(this.product && this.product.name && this.product.name != ''))
            return this.matSnackBar.open('Debes agregar un nombre.', 'Ok') && this.onStopSaveLoading();

        if (!(this.product && this.product.description && this.product.description != ''))
            return this.matSnackBar.open('Debes agregar una descripción.', 'Ok') && this.onStopSaveLoading();

        if (!(this.product && this.product.measureUuid && this.product.measureUuid != ''))
            return this.matSnackBar.open('Debes seleccionar un tipo de medida.', 'Ok') && this.onStopSaveLoading();

        if (!(this.product && this.product.productTypeUuid && this.product.productTypeUuid != ''))
            return this.matSnackBar.open('Debes seleccionar un tipo de producto.', 'Ok') && this.onStopSaveLoading();

        if ((this.product && this.product.productMaintenanceSteps && this.product.productMaintenanceSteps.length > 0)) {
            for (let index = 0; index < this.product.productMaintenanceSteps.length; index++) {
                const maintenanceStep = this.product.productMaintenanceSteps[index];

                if (!(maintenanceStep && maintenanceStep.order && maintenanceStep.order != ''))
                    return this.matSnackBar.open('Debes escribir el orden de los pasos.', 'Ok') && this.onStopSaveLoading();

                if (!(maintenanceStep && maintenanceStep.description && maintenanceStep.description != ''))
                    return this.matSnackBar.open('Debes escribir una descripción.', 'Ok') && this.onStopSaveLoading();

                if ((maintenanceStep && maintenanceStep.productMaintenanceStepDetails && maintenanceStep.productMaintenanceStepDetails.length > 0)) {
                    for (let index = 0; index < maintenanceStep.productMaintenanceStepDetails.length; index++) {
                        const maintenanceStepDetail = maintenanceStep.productMaintenanceStepDetails[index];

                        if (!(maintenanceStepDetail && maintenanceStepDetail.amount && maintenanceStepDetail.amount != ''))
                            return this.matSnackBar.open('Debes escribir un monto.', 'Ok') && this.onStopSaveLoading();

                        if (!(maintenanceStepDetail && maintenanceStepDetail.price && maintenanceStepDetail.price != ''))
                            return this.matSnackBar.open('Debes escribir un precio.', 'Ok') && this.onStopSaveLoading();

                        if (!(maintenanceStepDetail && maintenanceStepDetail.measureUnitUuid && maintenanceStepDetail.measureUnitUuid != ''))
                            return this.matSnackBar.open('Debes seleccionar una unidad de medida.', 'Ok') && this.onStopSaveLoading();
                    }
                }
            }
        }

        if (!(this.product && this.product.uuid && this.product.uuid != '' && SerializeHelper.isUUID(this.product.uuid))) {
            this.productService.onCreate(this.product as any).pipe(
                finalize(() => this.onStopSaveLoading()))
                .subscribe((result: any) => {
                    if (result.statusCode != 201)
                        this.matSnackBar.open(result?.message ?? 'No se pudo recuperar el error.', 'OK');

                    this.matSnackBar.open(result?.message ?? 'La cotizacion fue creada con exito.', 'OK');
                    this.router.navigate(['../'], { relativeTo: this.route })
                });
            return;
        }

        if ((this.product && this.product.uuid && this.product.uuid != '' && SerializeHelper.isUUID(this.product.uuid))) {
            this.productService.onUpdate(this.product.uuid, this.product as any).pipe(
                finalize(() => this.onStopSaveLoading()))
                .subscribe((result: any) => {
                    if (result.statusCode != 200) {
                        this.matSnackBar.open(result?.message ?? 'No se pudo recuperar el error.', 'OK');
                    } else {
                        this.matSnackBar.open(result?.message ?? 'La cotizacion fue actualizada con exito.', 'OK');
                        this.router.navigate(['../'], { relativeTo: this.route });
                    }
                });
            return;
        }
    }
}
