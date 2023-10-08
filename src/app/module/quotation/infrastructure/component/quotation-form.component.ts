import {
    Component,
} from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { subDays, startOfDay, addDays, endOfMonth, addHours } from 'date-fns';
import { MatSnackBar } from '@angular/material/snack-bar';
import { colors } from 'src/app/shared/color/domain/constant/color.constant';
import { QuotationService } from '../../application/service/quotation.service';
import { QuotationCreateInterface } from '../../domain/interface/quotation.interface';
import { ClientService } from 'src/app/module/client/application/service/client.service';
import { finalize, map } from 'rxjs';
import { ClientAutocompleteHelper } from 'src/app/module/client/application/helper/client-autocomplete.helper';
import { ClientInterface } from 'src/app/datasource/remas/domain/interface/client.interface';

@Component({
    selector: 'app-quotation-form',
    templateUrl: '../page/quotation-form.page.html',
    styleUrls: ['../style/quotation-form.style.scss'],
})
export class QuotationFormComponent {
    clients: ClientInterface[] = [];
    client!: ClientInterface;

    quotation: QuotationCreateInterface = {
        number: '',
        date: new Date(),
        clientUuid: '',
        quotationDetails: [],
    };
    constructor(
        private quotationService: QuotationService,
        public clientService: ClientService,
        public clientAutocompleteHelper: ClientAutocompleteHelper,
        private matSnackBar: MatSnackBar,
    ) { 
        this.clientAutocompleteHelper.onClientChange = (client: ClientInterface)=>this.client = client;
        this.clientAutocompleteHelper.onClientsChange = (clients: ClientInterface[])=>this.clients = clients;
    }

    ngOnInit() {
        this.clientAutocompleteHelper.onClientLoadInitial();
    }

    onImporteSum(){
        return 9999999.99;
    }


    onLogIn() {
    }
}
