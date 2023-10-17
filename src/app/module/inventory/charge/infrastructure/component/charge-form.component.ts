import {
    Component, ElementRef,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from 'src/app/module/client/application/service/client.service';
import { ClientInterface } from 'src/app/datasource/remas/domain/interface/client.interface';
import { ChargeInterface } from 'src/app/datasource/remas/domain/interface/charge.interface';
import { ChargeDetailScheduledInterface } from 'src/app/datasource/remas/domain/interface/charge-detail-scheduled.interface';
import { BehaviorSubject, finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SerializeHelper } from 'src/app/shared/serialize/application/helper/serialize.helper';
import { ChargeService } from 'src/app/datasource/remas/application/service/carge.service';
import { ProductInterface } from '../../../product/domain/interface/product.interface';

@Component({
    selector: 'app-charge-form',
    templateUrl: '../page/charge-form.page.html',
    styleUrls: ['../style/charge-form.style.scss'],
})
export class ChargeFormComponent {
    charge: Partial<ChargeInterface> = {
        dateStartScheduled: new Date(),
        dateEndScheduled: new Date(),
        dateStart: new Date(),
        dateEnd: new Date(),
        chargeDetailScheduleds: [],
    };

    total!: number;

    onSaveLoading$ = new BehaviorSubject<boolean>(false);
    timeSaveLoading: any;
    constructor(
        private chargeService: ChargeService,
        public clientService: ClientService,
        private matSnackBar: MatSnackBar,
        private elementRef: ElementRef,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.charge.uuid = this.route.snapshot.paramMap.get('uuid')!;
    }

    ngOnInit() {
        if (SerializeHelper.isUUID(this.charge.uuid!)) {
            this.chargeService.onFindOne(this?.charge?.uuid!)
                .subscribe((result) => {
                    if (result.statusCode != 200) {
                        this.matSnackBar.open('Ocurrio un error al obtener la cotización.');
                    } else {
                        const charge = result.data;
                        this.charge = charge;

                        

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

        this.charge
        console.log("🚀 ~ file: charge-form.component.ts:89 ~ ChargeFormComponent ~ onSave ~ this.charge:", this.charge)
        if (!(this.charge && this.charge.number))
            return this.matSnackBar.open('Debes escribir un número.', 'Ok') && this.onStopSaveLoading();

        if (!(this.charge && this.charge.chargeDetailScheduleds && this.charge.chargeDetailScheduleds.length > 0))
            return this.matSnackBar.open('Debes agregar el detalle de los productos.', 'Ok') && this.onStopSaveLoading();

        for (let index = 0; index < this.charge.chargeDetailScheduleds.length; index++) {
            const detail = this.charge.chargeDetailScheduleds[index];

           
            if (!(detail && detail.amount && detail.amount != ''))
                return this.matSnackBar.open(`Debes agregar la cantidad en el producto .`, 'Ok') && this.onStopSaveLoading();

            if (!(detail && detail.productUuid))
                return this.matSnackBar.open(`Hay un producto que tiene descripción, pero no se seleccionó el producto origen.`, 'Ok') && this.onStopSaveLoading();

            if (!(detail && detail.measureUnitUuid))
                return this.matSnackBar.open(`Debes elegir una unidad de medida en el producto .`, 'Ok') && this.onStopSaveLoading();

            if(!detail.chargeDetails){
                this.charge.chargeDetailScheduleds[index].chargeDetails = [];
            }
        }

        if (!(this.charge && this.charge.uuid && this.charge.uuid != '' && SerializeHelper.isUUID(this.charge.uuid))) {
            this.chargeService.onCreate(this.charge as any).pipe(
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

        if ((this.charge && this.charge.uuid && this.charge.uuid != '' && SerializeHelper.isUUID(this.charge.uuid))) {
            this.chargeService.onUpdate(this.charge.uuid, this.charge as any).pipe(
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


    onChangeDetail(index: number, detail: ChargeDetailScheduledInterface) {
        if (this.charge && this.charge.chargeDetailScheduleds && this.charge.chargeDetailScheduleds[index]) {
            this.charge.chargeDetailScheduleds[index] = detail;
            if (this.total || this.total == 0 || `${this.total}` == 'NaN') {
                this.total = this.onTotal();
            }
        }

    }

    onDeleteDetail(index: number, detail: ChargeDetailScheduledInterface) {
        if (this.charge && this.charge.chargeDetailScheduleds) {
            this.charge.chargeDetailScheduleds.splice(index, 1);
            if (this.total || this.total == 0 || `${this.total}` == 'NaN') this.total = this.onTotal();
        }
    }

    onAddDetail() {
        if (this.charge && this.charge.chargeDetailScheduleds) this.charge.chargeDetailScheduleds.push({} as any);
        else this.charge.chargeDetailScheduleds = [{} as any];

        this.total = this.onTotal();
    }

    onTotal() {
        if (this.charge && this.charge.chargeDetailScheduleds) {
            return this.charge.chargeDetailScheduleds.reduce((total, chargeDetailScheduled) => {
                if (chargeDetailScheduled && chargeDetailScheduled.amount) {
                    const amount = Number.isNaN(chargeDetailScheduled.amount) ? 0 : Number(chargeDetailScheduled.amount);
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
