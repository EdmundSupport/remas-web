import {
    Component, ElementRef,
} from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaintenanceInterface } from 'src/app/datasource/remas/domain/interface/maintenance.interface';
import { MeasureService } from 'src/app/datasource/remas/application/service/measure.service';
import { SerializeHelper } from 'src/app/shared/serialize/application/helper/serialize.helper';
import { MaintenanceService } from 'src/app/datasource/remas/application/service/maintenance.service';
import { UserInterface } from 'src/app/datasource/remas/domain/interface/user.interface';
import { UserService } from 'src/app/datasource/remas/application/service/user.service';
import { MaintenanceStatusInterface } from 'src/app/datasource/remas/domain/interface/maintenance-status.interface';
import { ProductInterface } from 'src/app/datasource/remas/domain/interface/product.interface';
import { ProductService } from 'src/app/datasource/remas/application/service/product.service';
import { ProductMaintenanceStepInterface } from 'src/app/datasource/remas/domain/interface/product-maintenance-step.interface';
import { MaintenanceTrackingService } from 'src/app/datasource/remas/application/service/maintenance-tracking.service';
import { MaintenanceStepInterface } from 'src/app/datasource/remas/domain/interface/maintenance-step.interface';
import { MaintenanceStepDetailInterface } from 'src/app/datasource/remas/domain/interface/maintenance-step-detail.interface';

@Component({
    selector: 'app-maintenance-form',
    templateUrl: '../page/maintenance-form.page.html',
    styleUrls: ['../style/maintenance-form.style.scss'],
})
export class MaintenanceFormComponent {

    maintenance: Partial<MaintenanceInterface> = {
        uuid: '',
        number: '',
        dateStartScheduled: new Date(),
        dateEndScheduled: new Date(),
        dateStart: new Date(),
        dateEnd: new Date(),
        userUuid: '',
        productUuid: '',
        product: undefined,
        maintenanceStatusUuid: '',
        maintenanceStatus: undefined,
        maintenanceSteps: [],
    };

    total!: number;

    onSaveLoading$ = new BehaviorSubject<boolean>(false);
    timeSaveLoading: any;

    product: ProductInterface | undefined;
    products: ProductInterface[] = [];
    productTimer: any;

    constructor(
        private matSnackBar: MatSnackBar,
        private elementRef: ElementRef,
        private router: Router,
        private route: ActivatedRoute,
        private maintenanceService: MaintenanceService,
        private productService: ProductService,
        private maintenanceTrackingService: MaintenanceTrackingService,
    ) {
        this.maintenance.uuid = this.route.snapshot.paramMap.get('uuid')!;
    }

    ngOnInit() {
        console.log("🚀 ~ file: maintenance-form.component.ts:66 ~ MaintenanceFormComponent ~ ngOnInit ~ this.maintenance:", this.maintenance)
        if (SerializeHelper.isUUID(this.maintenance.uuid!)) {
            this.maintenanceService.onFindOne(this.maintenance.uuid!).subscribe((result)=>{
                this.maintenance = result;

                if(this.maintenance.productUuid){
                    this.onLoadProduct({uuid:this.maintenance.productUuid}).add(()=>{
                        const product = this.products.find((product)=>product.uuid == this.maintenance.productUuid);
                        this.product = product;
                    });
                }
            });
        }
    }

    onStopSaveLoading() {
        this.onSaveLoading$.next(false)
        clearTimeout(this.timeSaveLoading);
    }

    onSave(): any {
        // this.onSaveLoading$.next(true);
        const timeMin = 5;
        const timeMs = 1000 * 60 * timeMin;
        this.timeSaveLoading = setTimeout(() => {
            this.matSnackBar.open(`Se detuvo la operacion, porque se espero mas de ${timeMin} minutos.`);
            this.onSaveLoading$.next(false);
        }, timeMs);
        const maintenance = { ...this.maintenance };

        // maintenance.maintenanceSteps = maintenance.product?.productMaintenanceSteps.map((productMaintenanceStep) => {
        //     const maintenanceStep: any = {};
        //     maintenanceStep['productMaintenanceStepUuid'] = productMaintenanceStep.uuid;
        //     maintenanceStep['maintenanceUuid'] = this.maintenance.uuid;
        //     if (!(productMaintenanceStep && productMaintenanceStep.productMaintenanceStepDetails && productMaintenanceStep.productMaintenanceStepDetails.length > 0)){
        //         maintenanceStep['condition'] = productMaintenanceStep.condition;
        //     }

        //     maintenanceStep['maintenanceStepDetails'] = productMaintenanceStep.productMaintenanceStepDetails.map((productMaintenanceStepDetail, index, array) => {
        //         if(!productMaintenanceStepDetail.maintenanceStepDetails[0].measureUnitUuid){
        //             array.splice(index, 1);
        //             return;
        //         }
        //         return productMaintenanceStepDetail.maintenanceStepDetails;
        //     }).flat();
        //     return maintenanceStep;
        // });


        if (!(maintenance && maintenance.uuid && maintenance.uuid != '' && SerializeHelper.isUUID(maintenance.uuid))) {
            delete maintenance.dateEnd;
            delete maintenance.dateStart;
            this.maintenanceService.onCreate({ ...maintenance, product: undefined } as any).pipe(
                finalize(() => this.onStopSaveLoading()))
                .subscribe((result: any) => {
                    if (result?.statusCode && result?.statusCode != 201) {
                        this.matSnackBar.open(result?.message ?? 'No se pudo recuperar el error.', 'OK');
                        return;
                    }

                    this.matSnackBar.open(result?.message ?? 'La orden de mantenimiento fue creada con exito.', 'OK');
                    this.router.navigate(['../'], { relativeTo: this.route })
                });
            return;
        }

        if ((maintenance && maintenance.uuid && maintenance.uuid != '' && SerializeHelper.isUUID(maintenance.uuid))) {
            this.maintenanceService.onUpdate(maintenance.uuid, { ...maintenance, product: undefined } as any).pipe(
                finalize(() => this.onStopSaveLoading()))
                .subscribe((result: any) => {
                    if (result.statusCode != 200) {
                        this.matSnackBar.open(result?.message ?? 'No se pudo recuperar el error.', 'OK');
                    } else {
                        this.matSnackBar.open(result?.message ?? 'La orden de mantenmiento fue actualizada con exito.', 'OK');
                        this.router.navigate(['../'], { relativeTo: this.route });
                    }
                });
            return;
        }
    }

    // region Autocomplete Product
    onChangeProduct(textProduct: string) {
        if (this.productTimer) clearTimeout(this.productTimer);

        this.productTimer = setTimeout(() => {
            if (textProduct) {
                this.onLoadProduct({ name: textProduct }).add(() => {
                    // this.products = this.products.filter((product) => product.uuid != this.detail.parentUuid);
                });
            }
        }, 400);
    }

    onSelectProduct(product: ProductInterface) {
        if(!product.uuid){
            this.matSnackBar.open(`No se encontro el producto.`, `OK`);
        }

        this.productService.onFindOne(product.uuid).subscribe((result)=>{
            this.product = result;
            this.maintenance.productUuid = result.uuid;
            if (!(this.product?.productMaintenanceSteps && this.product?.productMaintenanceSteps.length > 0)) {
                this.matSnackBar.open(`Este producto no tiene mantenimiento.`, `OK`);
                return;
            }

            this.maintenance.maintenanceSteps = this.product.productMaintenanceSteps.map((step) => {
                const stepNew: Partial<MaintenanceStepInterface> = {
                    condition: false,
                    order: step.order,
                    description: step.description,
                    maintenanceStepDetails: [],
                };
                stepNew.maintenanceStepDetails = step.productMaintenanceStepDetails.map((detail) => {
                    const detailNew: Partial<MaintenanceStepDetailInterface> = {
                        amount: detail.amount,
                        price: detail.price,
                        productUuid: detail.productUuid,
                        measureUnitUuid: detail.measureUnitUuid,
                        condition: false,
                    };
                    return detailNew;
                }) as any;
                return stepNew;
            }) as any;
        })

    }

    onLoadProduct(filter: Partial<ProductInterface>) {
        const payload = { pagination: { offset: 0, limit: 5 } };
        Object.assign(payload, filter);
        return this.productService.onFind(payload as any)
            .subscribe((data) => this.products = data);
    }

    onShowProduct(product: ProductInterface) {
        return product?.name ?? '';
    }

    onShowProductSelected = (product: ProductInterface) => {
        return product?.name ?? '';
    }
    // endregion Autocomplete Product

    onConfirm() {
        this.maintenanceTrackingService.onConfirm(this.maintenance.uuid!).subscribe((result) => {
            if (result?.statusCode && result?.statusCode != 200) {
                this.matSnackBar.open(result?.message ?? 'No se pudo recuperar el error.', 'Ok');
                return;
            }

            this.matSnackBar.open('Cotizacion confirmada, se generaron las ordenes de mantenimiento.');
        });
    }

    onFinalized() {
        this.maintenanceTrackingService.onFinalized(this.maintenance.uuid!).subscribe((result) => {
            if (result?.statusCode && result?.statusCode != 200) {
                this.matSnackBar.open(result?.message ?? 'No se pudo recuperar el error.', 'Ok');
                return;
            }

            this.matSnackBar.open('Mantenimiento finalizado.');
        });
    }

    onSend() {
        this.maintenanceTrackingService.onSend(this.maintenance.uuid!)
        this.matSnackBar.open('Cotizacion enviada.');
    }
}
