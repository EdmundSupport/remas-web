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

    quotation: Partial<QuotationInterface> = {
        number: '',
        date: new Date(),
        clientUuid: '',
        quotationStatusUuid: '',
        quotationDetails: [],
    };

    total: number = 0;
    constructor(
        private quotationService: QuotationService,
        public clientService: ClientService,
        private matSnackBar: MatSnackBar,
        private elementRef: ElementRef,
    ) { }

    ngOnInit() {
    }

    onLoad(index: number) {
        const targetDiv = this.elementRef.nativeElement.querySelector('#detail'+index);

        if (targetDiv) {
            targetDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    ngOnChanges(data: any) {
        console.log("🚀 ~ file: quotation-form.component.ts:40 ~ QuotationFormComponent ~ ngOnChanges ~ data:", data)
        this.onTotal();
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
        // console.log("🚀 ~ file: quotation-form.component.ts:76 ~ QuotationFormComponent ~ onChangeDetail ~ detail:", detail)
        // // this.total = this.onTotal();
        // const amount = Number.isNaN(detail.amount) ? 0 : Number(detail.amount);
        // const price = Number.isNaN(detail.price) ? 0 : Number(detail.price);
        // // console.log("🚀 ~ file: quotation-form.component.ts:81 ~ QuotationFormComponent ~ onChangeDetail ~ this.total:", this.total, amount, price)
        // this.total = this.total + (amount * price);

        if (this.quotation && this.quotation.quotationDetails && this.quotation.quotationDetails[index]) {
            this.quotation.quotationDetails[index] = detail;
            this.total = this.onTotal();
        }

    }

    onDeleteDetail(index: number, detail: QuotationDetailInterface) {
        if (this.quotation && this.quotation.quotationDetails) {
            this.quotation.quotationDetails.splice(index, 1);
            this.total = this.onTotal();
        }

        // const amount = !Number.isNaN(detail.amount) ? 0 : Number(detail.amount);
        // const price = !Number.isNaN(detail.price) ? 0 : Number(detail.price);
        // this.total += (amount * price);
    }

    onAddDetail() {
        if (this.quotation && this.quotation.quotationDetails) this.quotation.quotationDetails.push({} as any);
        else this.quotation.quotationDetails = [{} as any];

        this.total = this.onTotal();
    }

    onTotal() {
        // this.total + amount;
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
