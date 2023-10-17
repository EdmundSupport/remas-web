import {
    Component,
} from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { parseISO } from 'date-fns';
import { MatSnackBar } from '@angular/material/snack-bar';
import { colors } from 'src/app/shared/color/domain/constant/color.constant';
import { DischargeInterface } from 'src/app/datasource/remas/domain/interface/discharge.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarEventEditInterface } from '../../domain/interface/calendar-event-edit.interface';
import { Store } from '@ngrx/store';
import { increment } from 'src/app/shared/component/tool_bar/application/action/tool_bar.action';
import { Observable } from 'rxjs';
import { DischargeService } from 'src/app/datasource/remas/application/service/discharge.service';

@Component({
    selector: 'app-discharge',
    templateUrl: '../page/discharge.page.html',
    styleUrls: ['../style/discharge.style.scss'],
})
export class DischargeComponent {
    title: string = 'Cotizaciones';
    actions: CalendarEventAction[] = [
        {
            label: 'Editar',
            a11yLabel: 'Edit',
            onClick: ({ event }: { event: Partial<CalendarEventEditInterface> }): void => {
                const discharge = event.discharge;
                const route = ['/app/discharge', discharge?.uuid];
                this.router.navigate(route);
            },
        },
    ];

    events: CalendarEvent[] = [];

    discharges: DischargeInterface[] = [];
    count$!: Observable<number>;
    constructor(
        private dischargeService: DischargeService,
        private matSnackBar: MatSnackBar,
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<{ count: number }>,
    ) { 
        this.count$ = store.select('count');
    }

    ngOnInit() {
        const filter: DischargeInterface | {} = {};
        Object.assign(filter, { pagination: { offset: 0, limit: 5 } });
        this.onLoadDischarges(filter as DischargeInterface);
    }

    onAdd() {
        const route = ['/app/discharge', 'new'];
        this.router.navigate(route);
        this.store.dispatch(increment());
    }

    onChangeRange(range: { startDate: Date; endDate: Date }) {
        const filter: DischargeInterface | {} = {};
        Object.assign(filter, { dateStartScheduled: [range.startDate, range.endDate] });
        this.onLoadDischarges(filter as DischargeInterface);
    }

    onLoadDischarges(filter: DischargeInterface) {
        this.dischargeService.onFind(filter).subscribe((result) => {
            if (result?.statusCode != 200) this.matSnackBar.open(result?.message, 'Cancelar');
            this.discharges = result?.data;
            this.onDischargesToEvent();
        });
    }

    onDischargesToEvent() {
        this.events = this.discharges?.map!((discharge) => ({
            start: parseISO(`${discharge.dateStartScheduled}`),
            // end: discharge.date,
            title: discharge.number,
            color: { ...colors['yellow'] },
            actions: this.actions,
            resizable: {
                beforeStart: true,
                afterEnd: true,
            },
            draggable: true,
            discharge,
        }));
    }
}
