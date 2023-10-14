import {
    Component,
} from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { parseISO } from 'date-fns';
import { MatSnackBar } from '@angular/material/snack-bar';
import { colors } from 'src/app/shared/color/domain/constant/color.constant';
import { QuotationService } from '../../application/service/quotation.service';
import { QuotationInterface } from 'src/app/datasource/remas/domain/interface/quotation.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarEventEditInterface } from '../../domain/interface/calendar-event-edit.interface';
import { Store } from '@ngrx/store';
import { increment } from 'src/app/shared/component/tool_bar/application/action/tool_bar.action';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-quotation',
    templateUrl: '../page/quotation.page.html',
    styleUrls: ['../style/quotation.style.scss'],
})
export class QuotationComponent {
    title: string = 'Cotizaciones';
    actions: CalendarEventAction[] = [
        {
            label: 'Editar',
            a11yLabel: 'Edit',
            onClick: ({ event }: { event: Partial<CalendarEventEditInterface> }): void => {
                const quotation = event.quotation;
                const route = ['/app/quotation', quotation?.uuid];
                this.router.navigate(route);
            },
        },
    ];

    events: CalendarEvent[] = [];

    quotations: QuotationInterface[] = [];
    count$!: Observable<number>;
    constructor(
        private quotationService: QuotationService,
        private matSnackBar: MatSnackBar,
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<{ count: number }>,
    ) { 
        this.count$ = store.select('count');
    }

    ngOnInit() {
        const filter: QuotationInterface | {} = {};
        Object.assign(filter, { pagination: { offset: 0, limit: 5 } });
        this.onLoadQuotations(filter as QuotationInterface);
    }

    onAdd() {
        const route = ['/app/quotation', 'new'];
        this.router.navigate(route);
        this.store.dispatch(increment());
    }

    onChangeRange(range: { startDate: Date; endDate: Date }) {
        const filter: QuotationInterface | {} = {};
        Object.assign(filter, { date: [range.startDate, range.endDate] });
        this.onLoadQuotations(filter as QuotationInterface);
    }

    onLoadQuotations(filter: QuotationInterface) {
        this.quotationService.onFind(filter).subscribe((result) => {
            if (result?.statusCode != 200) this.matSnackBar.open(result?.message, 'Cancelar');
            this.quotations = result?.data;
            this.onQuotationsToEvent();
        });
    }

    onQuotationsToEvent() {
        this.events = this.quotations?.map!((quotation) => ({
            start: parseISO(`${quotation.date}`),
            // end: quotation.date,
            title: quotation.number,
            color: { ...colors['yellow'] },
            actions: this.actions,
            resizable: {
                beforeStart: true,
                afterEnd: true,
            },
            draggable: true,
            quotation,
        }));
    }
}
