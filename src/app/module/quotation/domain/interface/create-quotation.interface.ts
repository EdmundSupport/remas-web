import { QuotationDetailInterface, QuotationInterface } from "./quotation.interface";

export interface CreateQuotationDetailInterface
    extends Partial<
        Omit<QuotationDetailInterface, 'description' | 'amount' | 'price' | 'productUuid' | 'measureUnitUuid' | 'priceCategoryUuid'>> {
    description: string;
    amount: string;
    price: string;
    productUuid: string;
    measureUnitUuid: string;
    priceCategoryUuid: string;
}
export interface CreateQuotationInterface
    extends Partial<
        Omit<QuotationInterface, 'quotationDetails' | 'number' | 'date' | 'clientUuid'>> {
    number: string;
    date: Date;
    clientUuid: string;
    quotationDetails: CreateQuotationDetailInterface[];
}