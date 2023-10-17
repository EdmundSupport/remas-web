import { CalendarEvent } from 'angular-calendar';
import { MaintenanceInterface } from './maintenance.interface';
export interface CalendarEventEditInterface extends CalendarEvent{
    maintenance: MaintenanceInterface;
}