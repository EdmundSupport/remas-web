import {
    Component,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuotationService } from '../../application/service/quotation.service';
import { QuotationCreateInterface, QuotationInterface } from '../../domain/interface/quotation.interface';
import { ClientService } from 'src/app/module/client/application/service/client.service';
import { ClientInterface } from 'src/app/datasource/remas/domain/interface/client.interface';

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
    };
    constructor(
        private quotationService: QuotationService,
        public clientService: ClientService,
        private matSnackBar: MatSnackBar,
    ) { }

    ngOnInit() {
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

    onImporteSum() {
        return 9999999.99;
    }


    onLogIn() {
    }
}
