import {
    Component, ElementRef,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from 'src/app/module/billing/client/application/service/client.service';
import { ClientInterface } from 'src/app/datasource/remas/domain/interface/client.interface';
import { DischargeInterface } from 'src/app/datasource/remas/domain/interface/discharge.interface';
import { DischargeDetailScheduledInterface } from 'src/app/datasource/remas/domain/interface/discharge-detail-scheduled.interface';
import { BehaviorSubject, finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SerializeHelper } from 'src/app/shared/serialize/application/helper/serialize.helper';
import { DischargeService } from 'src/app/datasource/remas/application/service/discharge.service';
import { ProductInterface } from '../../../product/domain/interface/product.interface';

@Component({
    selector: 'app-discharge-form',
    templateUrl: '../page/discharge-form.page.html',
    styleUrls: ['../style/discharge-form.style.scss'],
})
export class DischargeFormComponent {
    discharge: Partial<DischargeInterface> = {
        dateStartScheduled: new Date(),
        dateEndScheduled: new Date(),
        dateStart: new Date(),
        dateEnd: new Date(),
        dischargeDetailScheduleds: [],
    };

    total!: number;

    onSaveLoading$ = new BehaviorSubject<boolean>(false);
    timeSaveLoading: any;
    constructor(
        private dischargeService: DischargeService,
        public clientService: ClientService,
        private matSnackBar: MatSnackBar,
        private elementRef: ElementRef,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.discharge.uuid = this.route.snapshot.paramMap.get('uuid')!;
    }

    ngOnInit() {
        if (SerializeHelper.isUUID(this.discharge.uuid!)) {
            this.dischargeService.onFindOne(this?.discharge?.uuid!)
                .subscribe((result) => {
                    if (result.statusCode != 200) {
                        this.matSnackBar.open('Ocurrio un error al obtener la cotización.');
                    } else {
                        const discharge = result.data;
                        this.discharge = discharge;

                        

                        this.total = this.onTotal();
                        this.onStopSaveLoading();
                    }
                });
        }
    }

    ngAfterContentInit() {
        if (this.onSaveLoading$.getValue()) this.total = this.onTotal();
    }

    onLoad(index: number) {
        const targetDiv = this.elementRef.nativeElement.querySelector('#detail' + index);

        if (targetDiv) {
            targetDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    ngOnChanges(data: any) {
    }

    onStopSaveLoading() {
        this.onSaveLoading$.next(false)
        clearTimeout(this.timeSaveLoading);
    }

    onSave(): any {
        // this.onSaveLoading$.next(true);
        // const timeMin = 5;
        // const timeMs = 1000 * 60 * timeMin;
        // this.timeSaveLoading = setTimeout(() => {
        //     this.matSnackBar.open(`Se detuvo la operacion, porque se espero mas de ${timeMin} minutos.`);
        //     this.onSaveLoading$.next(false);
        // }, timeMs);

        
        if (!(this.discharge && this.discharge.number))
            return this.matSnackBar.open('Debes escribir un número.', 'Ok') && this.onStopSaveLoading();

        if (!(this.discharge && this.discharge.dischargeDetailScheduleds && this.discharge.dischargeDetailScheduleds.length > 0))
            return this.matSnackBar.open('Debes agregar el detalle de los productos.', 'Ok') && this.onStopSaveLoading();

        for (let index = 0; index < this.discharge.dischargeDetailScheduleds.length; index++) {
            const detail = this.discharge.dischargeDetailScheduleds[index];

           
            if (!(detail && detail.amount && detail.amount != ''))
                return this.matSnackBar.open(`Debes agregar la cantidad en el producto .`, 'Ok') && this.onStopSaveLoading();

            if (!(detail && detail.productUuid))
                return this.matSnackBar.open(`Hay un producto que tiene descripción, pero no se seleccionó el producto origen.`, 'Ok') && this.onStopSaveLoading();

            if (!(detail && detail.measureUnitUuid))
                return this.matSnackBar.open(`Debes elegir una unidad de medida en el producto .`, 'Ok') && this.onStopSaveLoading();

            if(!detail.dischargeDetails){
                this.discharge.dischargeDetailScheduleds[index].dischargeDetails = [];
            }
        }

        if (!(this.discharge && this.discharge.uuid && this.discharge.uuid != '' && SerializeHelper.isUUID(this.discharge.uuid))) {
            this.dischargeService.onCreate(this.discharge as any).pipe(
                finalize(() => this.onStopSaveLoading()))
                .subscribe((result: any) => {
                    if (result.statusCode != 201){
                        this.matSnackBar.open(result?.message ?? 'No se pudo recuperar el error.', 'OK');
                        return;
                    }

                    this.matSnackBar.open(result?.message ?? 'La orden de carga fue creada con exito.', 'OK');
                    this.router.navigate(['../'], { relativeTo: this.route })
                });
            return;
        }

        if ((this.discharge && this.discharge.uuid && this.discharge.uuid != '' && SerializeHelper.isUUID(this.discharge.uuid))) {
            this.dischargeService.onUpdate(this.discharge.uuid, this.discharge as any).pipe(
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


    onChangeDetail(index: number, detail: DischargeDetailScheduledInterface) {
        if (this.discharge && this.discharge.dischargeDetailScheduleds && this.discharge.dischargeDetailScheduleds[index]) {
            this.discharge.dischargeDetailScheduleds[index] = detail;
            if (this.total || this.total == 0 || `${this.total}` == 'NaN') {
                this.total = this.onTotal();
            }
        }

    }

    onDeleteDetail(index: number, detail: DischargeDetailScheduledInterface) {
        if (this.discharge && this.discharge.dischargeDetailScheduleds) {
            this.discharge.dischargeDetailScheduleds.splice(index, 1);
            if (this.total || this.total == 0 || `${this.total}` == 'NaN') this.total = this.onTotal();
        }
    }

    onAddDetail() {
        if (this.discharge && this.discharge.dischargeDetailScheduleds) this.discharge.dischargeDetailScheduleds.push({} as any);
        else this.discharge.dischargeDetailScheduleds = [{} as any];

        this.total = this.onTotal();
    }

    onTotal() {
        if (this.discharge && this.discharge.dischargeDetailScheduleds) {
            return this.discharge.dischargeDetailScheduleds.reduce((total, dischargeDetailScheduled) => {
                if (dischargeDetailScheduled && dischargeDetailScheduled.amount) {
                    const amount = Number.isNaN(dischargeDetailScheduled.amount) ? 0 : Number(dischargeDetailScheduled.amount);
                    const op = total + (amount);
                    return op;
                } else return total + 0;
            }, 0);
        }
        return 0;
    }


    onLogIn() {
    }
}
