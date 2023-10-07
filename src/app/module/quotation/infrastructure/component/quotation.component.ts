import {
    Component,
} from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { subDays, startOfDay, addDays, endOfMonth, addHours } from 'date-fns';
import { MatSnackBar } from '@angular/material/snack-bar';
import { colors } from 'src/app/shared/color/domain/constant/color.constant';
import { QuotationService } from '../../application/service/quotation.service';

@Component({
    selector: 'app-quotation',
    templateUrl: '../page/quotation.page.html',
    styleUrls: ['../style/quotation.style.scss'],
})
export class QuotationComponent {
    title: string = 'Cotizaciones';
    actions: CalendarEventAction[] = [
        {
            label: '<p class="fas fa-fw fa-pencil-alt">test</p>',
            a11yLabel: 'Edit',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                console.log("🚀 ~ file: quotation.component.ts:19 ~ QuotationComponent ~ event:", event);
            },
        },
        {
            label: '<i class="fas fa-fw fa-trash-alt"></i>',
            a11yLabel: 'Delete',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                console.log("🚀 ~ file: quotation.component.ts:26 ~ QuotationComponent ~ event:", event)
            },
        },
    ];

    events: CalendarEvent[] = [
        {
            start: subDays(startOfDay(new Date()), 1),
            end: addDays(new Date(), 1),
            title: 'A 3 day event',
            color: { ...colors['red'] },
            actions: this.actions,
            allDay: true,
            resizable: {
                beforeStart: true,
                afterEnd: true,
            },
            draggable: true,
        },
        {
            start: startOfDay(new Date()),
            title: 'An event with no end date',
            color: { ...colors['yellow'] },
            actions: this.actions,
        },
        {
            start: subDays(endOfMonth(new Date()), 3),
            end: addDays(endOfMonth(new Date()), 3),
            title: 'A long event that spans 2 months',
            color: { ...colors['blue'] },
            allDay: true,
        },
        {
            start: addHours(startOfDay(new Date()), 2),
            end: addHours(new Date(), 2),
            title: 'A draggable and resizable event',
            color: { ...colors['yellow'] },
            actions: this.actions,
            resizable: {
                beforeStart: true,
                afterEnd: true,
            },
            draggable: true,
        },
    ];

    quotations!: {}[];

    constructor(
        private quotationService: QuotationService,
        private matSnackBar: MatSnackBar,
    ) { }

    ngOnInit() {

    }

    onFind(filter: {}) {
        this.quotationService.onFind(filter).subscribe((result) => {
            if (result?.statusCode != 201) this.matSnackBar.open(result?.message, 'Cancelar');
            this.quotations = result?.data;
        });
    }
}
