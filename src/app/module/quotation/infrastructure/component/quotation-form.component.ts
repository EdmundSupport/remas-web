import {
    Component, ElementRef,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuotationService } from '../../application/service/quotation.service';
import { ClientService } from 'src/app/module/client/application/service/client.service';
import { ClientInterface } from 'src/app/datasource/remas/domain/interface/client.interface';
import { QuotationInterface } from 'src/app/datasource/remas/domain/interface/quotation.interface';
import { QuotationDetailInterface } from 'src/app/datasource/remas/domain/interface/quotation-detail.interface';

@Component({
    selector: 'app-quotation-form',
    templateUrl: '../page/quotation-form.page.html',
    styleUrls: ['../style/quotation-form.style.scss'],
})
export class QuotationFormComponent {
    clients: ClientInterface[] = [];
    client!: ClientInterface;
    clientTimer: any;

    // quotation: Partial<QuotationInterface> = {
    //     number: '',
    //     date: new Date(),
    //     clientUuid: '',
    //     quotationDetails: [],
    // };
    quotation: Partial<QuotationInterface> = {
        "number": 202310112243,
        "date": "2023-10-12T04:43:14.671Z",
        "clientUuid": "8cb9e5f1-d053-4455-9c08-94d2b520fa45",
        "quotationDetails": [
            {
                "description": "Producto",
                "amount": "10",
                "price": "0.50",
                "productUuid": "f1a114cd-bb82-45b8-b999-0da095243b12",
                "measureUnitUuid": "d703d6eb-6b4a-4ef8-897b-3303e9523741",
                "priceCategoryUuid": "0483ebf6-4cc0-4cbd-a18c-8e5c06fc083d"
            }
        ]
    } as any;

    total!: number;
    constructor(
        private quotationService: QuotationService,
        public clientService: ClientService,
        private matSnackBar: MatSnackBar,
        private elementRef: ElementRef,
    ) { }

    ngOnInit() {
    }

    ngAfterContentInit() {
        this.total = this.onTotal();
    }

    onLoad(index: number) {
        const targetDiv = this.elementRef.nativeElement.querySelector('#detail' + index);

        if (targetDiv) {
            targetDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    ngOnChanges(data: any) {
        console.log("🚀 ~ file: quotation-form.component.ts:67 ~ QuotationFormComponent ~ ngOnChanges ~ data:", data)
    }

    onSave(): any {
        console.log("🚀 ~ file: quotation-form.component.ts:54 ~ QuotationFormComponent ~ onSave ~ this.quotation:", this.quotation)
        if (!(this.quotation && this.quotation.clientUuid && this.quotation.clientUuid != ''))
            return this.matSnackBar.open('Debes elegir a un cliente.', 'Ok');

        if (!(this.quotation && this.quotation.number))
            return this.matSnackBar.open('Debes escribir un número.', 'Ok');

        if (!(this.quotation && this.quotation.quotationDetails && this.quotation.quotationDetails.length > 0))
            return this.matSnackBar.open('Debes agregar el detalle de los productos.', 'Ok');

        for (let index = 0; index < this.quotation.quotationDetails.length; index++) {
            const detail = this.quotation.quotationDetails[index];

            if (!(detail && detail.description && detail.description != ''))
                return this.matSnackBar.open(`Debes agregar la descripcion en un producto.`, 'Ok');

            if (!(detail && detail.amount && detail.amount != ''))
                return this.matSnackBar.open(`Debes agregar la cantidad en el producto ${detail.description}.`, 'Ok');

            if (!(detail && detail.price && detail.price != ''))
                return this.matSnackBar.open(`Debes agregar el precio en el producto ${detail.description}.`, 'Ok');

            if (!(detail && detail.productUuid))
                return this.matSnackBar.open(`Hay un producto que tiene descripción, pero no se seleccionó el producto origen.`, 'Ok');

            if (!(detail && detail.measureUnitUuid))
                return this.matSnackBar.open(`Debes elegir una unidad de medida en el producto ${detail.description}.`, 'Ok');

            if (!(detail && detail.priceCategoryUuid))
                return this.matSnackBar.open(`El producto ${detail.description} tiene el precio agregado, pero no se seleccionó una categoria.`, 'Ok');

        }
    }

    // region Autocomplete Client
    onChangeClient(textClient: string) {
        if (this.clientTimer) clearTimeout(this.clientTimer);

        this.clientTimer = setTimeout(() => {
            if (textClient) {
                this.onLoadClient({ tributes: { companies: [{ name: textClient } as any] } as any })
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
        return (client && client.tributes
            && client.tributes.companies
            && client.tributes.companies[0]
            && client.tributes.companies[0].name) ? client.tributes.companies[0].name : '';
    }
    // endregion Autocomplete Client


    onChangeDetail(index: number, detail: QuotationDetailInterface) {
        if (this.quotation && this.quotation.quotationDetails && this.quotation.quotationDetails[index]) {
            this.quotation.quotationDetails[index] = detail;
            if (this.total >= 0){ 
                console.log("🚀 ~ file: quotation-form.component.ts:138 ~ QuotationFormComponent ~ onChangeDetail ~ detail:", detail)
                this.total = this.onTotal();
            }
        }

    }

    onDeleteDetail(index: number, detail: QuotationDetailInterface) {
        if (this.quotation && this.quotation.quotationDetails) {
            this.quotation.quotationDetails.splice(index, 1);
            if (this.total >= 0) this.total = this.onTotal();
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
            }, 0)
        }
        return 0;
    }


    onLogIn() {
    }
}
