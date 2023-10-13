import { QuotationInterface } from "src/app/datasource/remas/domain/interface/quotation.interface";

export interface FindQuotationInterface extends Omit<QuotationInterface, 'date'> {
    date: Date | [Date, Date]
}