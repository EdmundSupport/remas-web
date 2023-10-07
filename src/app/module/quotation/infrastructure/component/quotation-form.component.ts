import {
    Component,
} from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { subDays, startOfDay, addDays, endOfMonth, addHours } from 'date-fns';
import { MatSnackBar } from '@angular/material/snack-bar';
import { colors } from 'src/app/shared/color/domain/constant/color.constant';
import { QuotationService } from '../../application/service/quotation.service';
import { ClientInterface, QuotationCreateInterface } from '../../domain/interface/quotation.interface';
import { ClientService } from 'src/app/module/client/application/service/client.service';
import { finalize, map } from 'rxjs';

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
        private matSnackBar: MatSnackBar,
    ) { }

    ngOnInit() {
        this.onClientLoadInitial();
    }

    onImporteSum(){
        return 9999999.99;
    }

    onClientSelected(client: ClientInterface) {
        this.client = client;
    }

    onClientOptionShow(client: any) {
        return client?.tributes?.companies![0]?.['name'];
    }

    onClientSearch(clientName: string) {
        this.onClientLoad(clientName).subscribe((result) => this.clients = result);
    }

    onClientLoad(clientName: string | undefined) {
        return this.clientService.onFind({ tributes: { companies: { name: clientName } } }, { omitLoading: true }).pipe(
            map((result) => {
                if (result?.statusCode != 200) {
                    this.matSnackBar.open(result?.message, 'Cancelar');
                    return [];
                }
                return result?.data;
            }));
    }

    onClientLoadInitial() {
        this.clientService.onFindLoad$.next(true);
        this.onClientLoad(undefined).pipe(
            finalize(() => this.clientService.onFindLoad$.next(false)))
            .subscribe((data) => {
                this.clients = data;
            });
    }

    onLogIn() {
    }
}
