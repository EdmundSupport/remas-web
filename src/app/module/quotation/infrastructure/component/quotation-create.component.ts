import {
    Component,
} from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { subDays, startOfDay, addDays, endOfMonth, addHours } from 'date-fns';
import { MatSnackBar } from '@angular/material/snack-bar';
import { colors } from 'src/app/shared/color/domain/constant/color.constant';
import { QuotationService } from '../../application/service/quotation.service';
import { QuotationCreateInterface } from '../../domain/interface/quotation.interface';

@Component({
    selector: 'app-quotation-create',
    templateUrl: '../page/quotation-create.page.html',
    styleUrls: ['../style/quotation-create.style.scss'],
})
export class QuotationCreateComponent {
    quotation: QuotationCreateInterface = {
        number: '',
        date: new Date(),
        clientUuid: '',
        quotationDetails: [],
    };
    constructor() { }

    ngOnInit() {
        
    }
    onLogIn(){
        console.log("🚀 ~ file: quotation-create.component.ts:18 ~ QuotationCreateComponent ~ quotation:", this.quotation)
        
    }
}
