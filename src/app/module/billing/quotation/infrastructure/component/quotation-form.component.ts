import {
    Component, ElementRef,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuotationService } from '../../application/service/quotation.service';
import { ClientService } from 'src/app/module/billing/client/application/service/client.service';
import { ClientInterface } from 'src/app/datasource/remas/domain/interface/client.interface';
import { QuotationInterface } from 'src/app/datasource/remas/domain/interface/quotation.interface';
import { QuotationDetailInterface } from 'src/app/datasource/remas/domain/interface/quotation-detail.interface';
import { BehaviorSubject, finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SerializeHelper } from 'src/app/shared/serialize/application/helper/serialize.helper';
import { QuotationTrackingService } from 'src/app/datasource/remas/application/service/quotation-tracking.service';

@Component({
    selector: 'app-quotation-form',
    templateUrl: '../page/quotation-form.page.html',
    styleUrls: ['../style/quotation-form.style.scss'],
})
export class QuotationFormComponent {
    clients: ClientInterface[] = [];
    client!: ClientInterface;
    clientTimer: any;

    quotation: Partial<QuotationInterface> = {
        number: '',
        date: new Date(),
        clientUuid: '',
        quotationDetails: [],
    };

    total!: number;

    onSaveLoading$ = new BehaviorSubject<boolean>(false);
    timeSaveLoading: any;
    constructor(
        private quotationService: QuotationService,
        private quotationTrackingService: QuotationTrackingService,
        public clientService: ClientService,
        private matSnackBar: MatSnackBar,
        private elementRef: ElementRef,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.quotation.uuid = this.route.snapshot.paramMap.get('uuid')!;
    }

    ngOnInit() {
        if (SerializeHelper.isUUID(this.quotation.uuid!)) {
            this.quotationService.onFindOne(this?.quotation?.uuid!)
                .subscribe((result) => {
                    console.log("🚀 ~ file: quotation-form.component.ts:52 ~ QuotationFormComponent ~ .subscribe ~ result:", result)
                    if (result.statusCode != 200) {
                        this.matSnackBar.open('Ocurrio un error al obtener la cotización.', 'Ok');
                    } else {
                        const quotation = result.data;
                        this.quotation = quotation;

                        if (this.quotation.clientUuid) this.onLoadClient({ uuid: this.quotation.clientUuid, tribute: { companies: [{ condition: true } as any] } as any })
                            .add(() => {
                                this.client = this.clients.find((client) => client.uuid == this.quotation.clientUuid)!;
                            });

                        this.total = this.onTotal();
                        this.onStopSaveLoading();
                    }
                });
        }
    }

    ngAfterContentInit() {
        if (this.onSaveLoading$.getValue()) this.total = this.onTotal();
    }

    onConfirm(){
        this.quotationTrackingService.onConfirm(this.quotation.uuid!).subscribe((result)=>{
            if(result?.statusCode && result?.statusCode != 200){
                this.matSnackBar.open(result?.message ?? 'No se pudo recuperar el error.', 'Ok');
                return;
            }
            
            this.matSnackBar.open('Cotizacion confirmada, se generaron las ordenes de mantenimiento.');
        });
    }

    onSend(){
        this.quotationTrackingService.onSend(this.quotation.uuid!)    
        this.matSnackBar.open('Cotizacion enviada.');
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
        this.onSaveLoading$.next(true);
        const timeMin = 5;
        const timeMs = 1000 * 60 * timeMin;
        this.timeSaveLoading = setTimeout(() => {
            this.matSnackBar.open(`Se detuvo la operacion, porque se espero mas de ${timeMin} minutos.`);
            this.onSaveLoading$.next(false);
        }, timeMs);

        if (!(this.quotation && this.quotation.clientUuid && this.quotation.clientUuid != ''))
            return this.matSnackBar.open('Debes elegir a un cliente.', 'Ok') && this.onStopSaveLoading();

        if (!(this.quotation && this.quotation.number))
            return this.matSnackBar.open('Debes escribir un número.', 'Ok') && this.onStopSaveLoading();

        if (!(this.quotation && this.quotation.quotationDetails && this.quotation.quotationDetails.length > 0))
            return this.matSnackBar.open('Debes agregar el detalle de los productos.', 'Ok') && this.onStopSaveLoading();

        for (let index = 0; index < this.quotation.quotationDetails.length; index++) {
            const detail = this.quotation.quotationDetails[index];

            if (!(detail && detail.description && detail.description != ''))
                return this.matSnackBar.open(`Debes agregar la descripcion en un producto.`, 'Ok') && this.onStopSaveLoading();

            if (!(detail && detail.amount && detail.amount != ''))
                return this.matSnackBar.open(`Debes agregar la cantidad en el producto ${detail.description}.`, 'Ok') && this.onStopSaveLoading();

            if (!(detail && detail.price && detail.price != ''))
                return this.matSnackBar.open(`Debes agregar el precio en el producto ${detail.description}.`, 'Ok') && this.onStopSaveLoading();

            if (!(detail && detail.productUuid))
                return this.matSnackBar.open(`Hay un producto que tiene descripción, pero no se seleccionó el producto origen.`, 'Ok') && this.onStopSaveLoading();

            if (!(detail && detail.measureUnitUuid))
                return this.matSnackBar.open(`Debes elegir una unidad de medida en el producto ${detail.description}.`, 'Ok') && this.onStopSaveLoading();

            if (!(detail && detail.priceCategoryUuid))
                return this.matSnackBar.open(`El producto ${detail.description} tiene el precio agregado, pero no se seleccionó una categoria.`, 'Ok') && this.onStopSaveLoading();

        }
        if (!(this.quotation && this.quotation.uuid && this.quotation.uuid != '' && SerializeHelper.isUUID(this.quotation.uuid))) {
            this.quotationService.onCreate(this.quotation as any).pipe(
                finalize(() => this.onStopSaveLoading()))
                .subscribe((result: any) => {
                    if (result.statusCode != 201)
                        this.matSnackBar.open(result?.message ?? 'No se pudo recuperar el error.', 'OK');

                    this.matSnackBar.open(result?.message ?? 'La cotizacion fue creada con exito.', 'OK');
                    this.router.navigate(['../'], { relativeTo: this.route })
                });
            return;
        }

        if ((this.quotation && this.quotation.uuid && this.quotation.uuid != '' && SerializeHelper.isUUID(this.quotation.uuid))) {
            this.quotationService.onUpdate(this.quotation.uuid, this.quotation as any).pipe(
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

    // region Autocomplete Client
    onChangeClient(textClient: string) {
        if (this.clientTimer) clearTimeout(this.clientTimer);

        this.clientTimer = setTimeout(() => {
            if (textClient) {
                this.onLoadClient({ tribute: { companies: [{ name: textClient } as any] } as any })
            }
        }, 400);
    }

    onSelectClient(client: ClientInterface) {
        this.client = client;
        this.quotation.clientUuid = this.client.uuid;
    }

    onLoadClient(filter: Partial<ClientInterface>) {
        const payload = { pagination: { offset: 0, limit: 5 } };
        Object.assign(payload, filter);
        return this.clientService.onFind(payload)
            .subscribe((data) => this.clients = data);
    }

    onShowClient(client: ClientInterface) {
        return (client && client.tribute
            && client.tribute.companies
            && client.tribute.companies[0]
            && client.tribute.companies[0].name) ? client.tribute.companies[0].name : '';
    }
    // endregion Autocomplete Client


    onChangeDetail(index: number, detail: QuotationDetailInterface) {
        if (this.quotation && this.quotation.quotationDetails && this.quotation.quotationDetails[index]) {
            this.quotation.quotationDetails[index] = detail;
            if (this.total || this.total == 0 || `${this.total}` == 'NaN') {
                this.total = this.onTotal();
            }
        }

    }

    onDeleteDetail(index: number, detail: QuotationDetailInterface) {
        if (this.quotation && this.quotation.quotationDetails) {
            this.quotation.quotationDetails.splice(index, 1);
            if (this.total || this.total == 0 || `${this.total}` == 'NaN') this.total = this.onTotal();
        }
    }

    onAddDetail() {
        if (this.quotation && this.quotation.quotationDetails) this.quotation.quotationDetails.push({} as any);
        else this.quotation.quotationDetails = [{} as any];

        this.total = this.onTotal();
    }

    onTotal() {
        if (this.quotation && this.quotation.quotationDetails) {
            return this.quotation.quotationDetails.reduce((total, quotationDetail) => {
                if (quotationDetail && quotationDetail.amount && quotationDetail.price) {
                    const amount = Number.isNaN(quotationDetail.amount) ? 0 : Number(quotationDetail.amount);
                    const price = Number.isNaN(quotationDetail.price) ? 0 : Number(quotationDetail.price);
                    const op = total + (amount * price);
                    return op;
                } else return total + 0;
            }, 0);
        }
        return 0;
    }


    onLogIn() {
    }
}
