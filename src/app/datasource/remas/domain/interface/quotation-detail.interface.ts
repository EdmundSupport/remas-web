import { QuotationInterface } from "./quotation.interface";

export interface QuotationDetailInterface{
    uuid: string;
    amount: string;
    description: string;
    price: string;
    quotationUuid: string;
    productUuid: string;
    measureUnitUuid: string;
    priceCategoryUuid: string;
    condition: boolean;
    createdAt: Date;
    updatedAt: Date;
    quotation: QuotationInterface;
}