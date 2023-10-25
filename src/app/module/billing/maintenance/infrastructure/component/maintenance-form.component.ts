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
        maintenanceSteps: []
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
        if (SerializeHelper.isUUID(this.maintenance.uuid!)) {
            this.maintenanceService.onFindOne(this?.maintenance?.uuid!)
                .subscribe((result) => {
                    if (result?.statusCode && result?.statusCode != 200) {
                        this.matSnackBar.open('Ocurrio un error al obtener el maintenanceo.');
                        return;
                    }

                    this.maintenance = result;
                    if (this.maintenance?.productUuid) {
                        this.onLoadProductInit(this.maintenance.productUuid);
                    };


                    // this.total = this.onTotal();
                    this.onStopSaveLoading();
                });
        }
    }


    onLoadProductInit(productUuid: string) {
        this.productService.onFindOne(productUuid)
            .subscribe((result) => {
                if (result?.statusCode && result?.statusCode != 200) {
                    this.matSnackBar.open(result?.message ?? 'Ocurrio un error al cargar los productos.');
                    return;
                }
                const product: ProductInterface = result;
                if (product) {
                    product.productMaintenanceSteps = product.productMaintenanceSteps.map((productMaintenanceStep) => {
                        const maintenanceStep = this.maintenance.maintenanceSteps?.find((maintenanceStep) => maintenanceStep.productMaintenanceStepUuid == productMaintenanceStep.uuid);
                        productMaintenanceStep.productMaintenanceStepDetails = productMaintenanceStep.productMaintenanceStepDetails.map((productMaintenanceStepDetail) => {
                            const maintenanceStepDetail = maintenanceStep?.maintenanceStepDetails.find((maintenanceStepDetail) => maintenanceStepDetail.productMaintenanceStepDetailUuid == productMaintenanceStepDetail.uuid);
                            productMaintenanceStepDetail.maintenanceStepDetails = maintenanceStepDetail ? [maintenanceStepDetail] : [];
                            return productMaintenanceStepDetail;
                        }) ?? [];

                        productMaintenanceStep.maintenanceSteps = maintenanceStep ? [maintenanceStep] : [];
                        return productMaintenanceStep;
                    });
                }
                // delete result['productMaintenanceSteps'];
                this.products = [product];
                this.product = product;
                // this.product.condition = false;
                this.maintenance.product = product;
            });
    }

    ngOnChanges(){        
    }

    onChangeDetail(index: number, detail: ProductMaintenanceStepInterface) {
        if (this.maintenance && this.maintenance.product && this.maintenance.product.productMaintenanceSteps && this.maintenance.product.productMaintenanceSteps[index]) {
            this.maintenance.product.productMaintenanceSteps[index] = detail;
        }
        this.ngOnChanges();
    }

    onStopSaveLoading() {
        this.onSaveLoading$.next(false)
        clearTimeout(this.timeSaveLoading);
    }

    onSave(): any {
        this.onSaveLoading$.next(true);
        const timeMin = 5;
        const timeMs = 1000 * 60 * timeMin;
        this.timeSaveLoading = setTimeout(() => {
            this.matSnackBar.open(`Se detuvo la operacion, porque se espero mas de ${timeMin} minutos.`);
            this.onSaveLoading$.next(false);
        }, timeMs);
        const maintenance = { ...this.maintenance };
        
        maintenance.maintenanceSteps = maintenance.product?.productMaintenanceSteps.map((productMaintenanceStep) => {
            const maintenanceStep: any = {};
            maintenanceStep['productMaintenanceStepUuid'] = productMaintenanceStep.uuid;
            maintenanceStep['maintenanceUuid'] = this.maintenance.uuid;
            if (!(productMaintenanceStep && productMaintenanceStep.productMaintenanceStepDetails && productMaintenanceStep.productMaintenanceStepDetails.length > 0)){
                maintenanceStep['condition'] = productMaintenanceStep.condition;
            }

            maintenanceStep['maintenanceStepDetails'] = productMaintenanceStep.productMaintenanceStepDetails.map((productMaintenanceStepDetail) => {
                return productMaintenanceStepDetail.maintenanceStepDetails;
            }).flat();
            return maintenanceStep;
        });

        maintenance.maintenanceSteps = maintenance.maintenanceSteps?.filter((maintenanceStep) => {
            const details = maintenanceStep.maintenanceStepDetails.filter((maintenanceStepDetail) => (maintenanceStepDetail.amount && maintenanceStepDetail.amount != '' && maintenanceStepDetail.price && maintenanceStepDetail.price != ''))
            return details.length >= 1 || maintenanceStep.condition == true;
        });
        // delete maintenance['product'];

        if (!(maintenance))
            return this.matSnackBar.open('Debes completar la informacion del mantenimiento.', 'Ok') && this.onStopSaveLoading();

        if (!(maintenance.number && maintenance.number != ''))
            return this.matSnackBar.open('Debes agregar un numero de mantenimiento.', 'Ok') && this.onStopSaveLoading();

        if (!(maintenance.dateStartScheduled))
            return this.matSnackBar.open('Debes seleccionar una fecha inicial programada.', 'Ok') && this.onStopSaveLoading();

        if (!(maintenance.dateEndScheduled))
            return this.matSnackBar.open('Debes seleccionar una fecha final programada.', 'Ok') && this.onStopSaveLoading();

        if (!(maintenance.productUuid && maintenance.productUuid != ''))
            return this.matSnackBar.open('Debes seleccionar un producto.', 'Ok') && this.onStopSaveLoading();

        if (!(maintenance.maintenanceSteps && maintenance.uuid))
            return this.matSnackBar.open('Debes completar todos los pasos para poder continuar.', 'Ok') && this.onStopSaveLoading();

        if (!(maintenance && maintenance.uuid && maintenance.uuid != '' && SerializeHelper.isUUID(maintenance.uuid))) {
            delete maintenance.dateEnd;
            delete maintenance.dateStart;
            this.maintenanceService.onCreate({...maintenance, product: undefined} as any).pipe(
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
            this.maintenanceService.onUpdate(maintenance.uuid, {...maintenance, product: undefined} as any).pipe(
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

    // region product steps
    onLoadProductSteps(productUuid: string) {
        return this.productService.onFindOne(productUuid)
            .subscribe((result) => {
                if (result?.statusCode && result?.statusCode != 200) {
                    this.matSnackBar.open(result?.message ?? 'Ocurrio un error al cargar los productos.');
                    return;
                }
                if(result?.productMaintenanceSteps?.length <= 0){
                    this.matSnackBar.open('Este producto no tiene mantenimiento.');
                    this.product = undefined;
                    return;
                }

                this.maintenance.product = result;
            });
    }
    // endregion product steps

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
        this.maintenance.productUuid = this.product.uuid;
        this.onLoadProductSteps(this.product.uuid);
        this.ngOnChanges();
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

    onConfirm(){
        this.maintenanceTrackingService.onConfirm(this.maintenance.uuid!).subscribe((result)=>{
            if(result?.statusCode && result?.statusCode != 200){
                this.matSnackBar.open(result?.message ?? 'No se pudo recuperar el error.', 'Ok');
                return;
            }
            
            this.matSnackBar.open('Cotizacion confirmada, se generaron las ordenes de mantenimiento.');
        });
    }

    onSend(){
        this.maintenanceTrackingService.onSend(this.maintenance.uuid!)    
        this.matSnackBar.open('Cotizacion enviada.');
    }
}
