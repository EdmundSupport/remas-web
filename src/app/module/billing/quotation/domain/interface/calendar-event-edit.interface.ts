import { CalendarEvent } from 'angular-calendar';
import { QuotationInterface } from './quotation.interface';
export interface CalendarEventEditInterface extends CalendarEvent{
    quotation: QuotationInterface;
}