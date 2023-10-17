import {
    Component,
} from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { parseISO } from 'date-fns';
import { MatSnackBar } from '@angular/material/snack-bar';
import { colors } from 'src/app/shared/color/domain/constant/color.constant';
import { ChargeInterface } from 'src/app/datasource/remas/domain/interface/charge.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarEventEditInterface } from '../../domain/interface/calendar-event-edit.interface';
import { Store } from '@ngrx/store';
import { increment } from 'src/app/shared/component/tool_bar/application/action/tool_bar.action';
import { Observable } from 'rxjs';
import { ChargeService } from 'src/app/datasource/remas/application/service/carge.service';

@Component({
    selector: 'app-charge',
    templateUrl: '../page/charge.page.html',
    styleUrls: ['../style/charge.style.scss'],
})
export class ChargeComponent {
    title: string = 'Cotizaciones';
    actions: CalendarEventAction[] = [
        {
            label: 'Editar',
            a11yLabel: 'Edit',
            onClick: ({ event }: { event: Partial<CalendarEventEditInterface> }): void => {
                const charge = event.charge;
                const route = ['/app/charge', charge?.uuid];
                this.router.navigate(route);
            },
        },
    ];

    events: CalendarEvent[] = [];

    charges: ChargeInterface[] = [];
    count$!: Observable<number>;
    constructor(
        private chargeService: ChargeService,
        private matSnackBar: MatSnackBar,
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<{ count: number }>,
    ) { 
        this.count$ = store.select('count');
    }

    ngOnInit() {
        const filter: ChargeInterface | {} = {};
        Object.assign(filter, { pagination: { offset: 0, limit: 5 } });
        this.onLoadCharges(filter as ChargeInterface);
    }

    onAdd() {
        const route = ['/app/charge', 'new'];
        this.router.navigate(route);
        this.store.dispatch(increment());
    }

    onChangeRange(range: { startDate: Date; endDate: Date }) {
        const filter: ChargeInterface | {} = {};
        Object.assign(filter, { dateStartScheduled: [range.startDate, range.endDate] });
        this.onLoadCharges(filter as ChargeInterface);
    }

    onLoadCharges(filter: ChargeInterface) {
        this.chargeService.onFind(filter).subscribe((result) => {
            if (result?.statusCode != 200) this.matSnackBar.open(result?.message, 'Cancelar');
            this.charges = result?.data;
            this.onChargesToEvent();
        });
    }

    onChargesToEvent() {
        this.events = this.charges?.map!((charge) => ({
            start: parseISO(`${charge.dateStartScheduled}`),
            // end: charge.date,
            title: charge.number,
            color: { ...colors['yellow'] },
            actions: this.actions,
            resizable: {
                beforeStart: true,
                afterEnd: true,
            },
            draggable: true,
            charge,
        }));
    }
}
