import {
    Component,
} from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { parseISO } from 'date-fns';
import { MatSnackBar } from '@angular/material/snack-bar';
import { colors } from 'src/app/shared/color/domain/constant/color.constant';
import { MaintenanceInterface } from 'src/app/datasource/remas/domain/interface/maintenance.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarEventEditInterface } from '../../domain/interface/calendar-event-edit.interface';
import { Store } from '@ngrx/store';
import { increment } from 'src/app/shared/component/tool_bar/application/action/tool_bar.action';
import { Observable } from 'rxjs';
import { MaintenanceService } from 'src/app/datasource/remas/application/service/maintenance.service';

@Component({
    selector: 'app-maintenance',
    templateUrl: '../page/maintenance.page.html',
    styleUrls: ['../style/maintenance.style.scss'],
})
export class MaintenanceComponent {
    title: string = 'Cotizaciones';
    actions: CalendarEventAction[] = [
        {
            label: 'Editar',
            a11yLabel: 'Edit',
            onClick: ({ event }: { event: Partial<CalendarEventEditInterface> }): void => {
                const maintenance = event.maintenance;
                const route = ['/app/maintenance', maintenance?.uuid];
                this.router.navigate(route);
            },
        },
    ];

    events: CalendarEvent[] = [];

    maintenances: MaintenanceInterface[] = [];
    count$!: Observable<number>;
    constructor(
        private maintenanceService: MaintenanceService,
        private matSnackBar: MatSnackBar,
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<{ count: number }>,
    ) { 
        this.count$ = store.select('count');
    }

    ngOnInit() {
        const filter: MaintenanceInterface | {} = {};
        Object.assign(filter, { pagination: { offset: 0, limit: 5 } });
        this.onLoadMaintenances(filter as MaintenanceInterface);
    }

    onAdd() {
        const route = ['/app/maintenance', 'new'];
        this.router.navigate(route);
        this.store.dispatch(increment());
    }

    onChangeRange(range: { startDate: Date; endDate: Date }) {
        const filter: MaintenanceInterface | {} = {};
        Object.assign(filter, { dateStartScheduled: [range.startDate, range.endDate] });
        this.onLoadMaintenances(filter as MaintenanceInterface);
    }

    onLoadMaintenances(filter: MaintenanceInterface) {
        this.maintenanceService.onFind(filter).subscribe((result) => {
            if (result?.statusCode && result?.statusCode != 200){ 
                this.matSnackBar.open(result?.message, 'Cancelar');
                return;
            }
            this.maintenances = result?.data;
            this.onMaintenancesToEvent();
        });
    }

    onMaintenancesToEvent() {
        this.events = this.maintenances?.map!((maintenance) => ({
            start: parseISO(`${maintenance.dateStartScheduled}`),
            // end: maintenance.date,
            title: maintenance.number,
            color: { ...colors['yellow'] },
            actions: this.actions,
            resizable: {
                beforeStart: true,
                afterEnd: true,
            },
            draggable: true,
            maintenance,
        }));
    }
}
