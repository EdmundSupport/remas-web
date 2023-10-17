import { CalendarEvent } from 'angular-calendar';
import { ChargeInterface } from 'src/app/datasource/remas/domain/interface/charge.interface';
export interface CalendarEventEditInterface extends CalendarEvent{
    charge: ChargeInterface;
}