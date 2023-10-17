import { CalendarEvent } from 'angular-calendar';
import { DischargeInterface } from 'src/app/datasource/remas/domain/interface/discharge.interface';
export interface CalendarEventEditInterface extends CalendarEvent{
    discharge: DischargeInterface;
}