import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    TemplateRef,
    Input,
    EventEmitter,
    Output,
} from '@angular/core';
import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours,
    startOfWeek,
    endOfWeek,
    startOfMonth,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const colors: Record<string, EventColor> = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF',
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA',
    },
};

@Component({
    selector: 'app-calendar',
    templateUrl: '../page/calendar.page.html',
    styleUrls: ['../style/calendar.style.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
    @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
    @Output('onChangeRange') onChangeRange = new EventEmitter();
    @Output('onAdd') onAdd = new EventEmitter();
    @Input('events') events!: CalendarEvent[];
    @Input('title') title: string = '';
    @Input('actions') actions!: CalendarEventAction[];

    view: CalendarView = CalendarView.Month;

    CalendarView = CalendarView;

    viewDate: Date = new Date();

    modalData!: {
        action: string;
        event: CalendarEvent;
    };

    refresh = new Subject<void>();

    activeDayIsOpen: boolean = true;

    constructor() { }

    ngOnInit(){
        this.emitChangeRange()
    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events!.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
            }
            this.viewDate = date;
        }
    }

    eventTimesChanged({
        event,
        newStart,
        newEnd,
    }: CalendarEventTimesChangedEvent): void {
        this.events = this.events!.map((iEvent) => {
            if (iEvent === event) {
                return {
                    ...event,
                    start: newStart,
                    end: newEnd,
                };
            }
            return iEvent;
        });
        this.handleEvent('Dropped or resized', event);
    }

    handleEvent(action: string, event: CalendarEvent): void {
        this.modalData = { event, action };
        // this.modal.open(this.modalContent, { size: 'lg' });
    }

    addEvent(): void {
        this.events = [
            ...this.events,
            {
                title: 'New event',
                start: startOfDay(new Date()),
                end: endOfDay(new Date()),
                color: colors['red'],
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true,
                },
            },
        ];
    }

    deleteEvent(eventToDelete: CalendarEvent) {
        this.events = this.events!.filter((event) => event !== eventToDelete);
    }

    setView(view: CalendarView) {
        this.view = view;
    }

    closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }

    emitChangeRange() {
        let startDate,
            endDate;
        if (this.view == CalendarView.Week) {
            startDate = startOfWeek(this.viewDate);
            endDate = endOfWeek(this.viewDate);
        }

        if (this.view == CalendarView.Month) {
            startDate = startOfMonth(this.viewDate);
            endDate = endOfMonth(this.viewDate);
        }

        if (this.view == CalendarView.Day) {
            startDate = startOfDay(this.viewDate);
            endDate = endOfDay(this.viewDate);
        }

        this.onChangeRange.emit({ startDate, endDate });
    }

    emitAdd(){
        this.onAdd.emit();
    }
}
