import { ClientInterface } from "./client.interface";
import { PaginationInterface } from "./pagination.interface";
import { QuotationDetailInterface } from "./quotation-detail.interface";
import { QuotationStatusInterface } from "./quotation-status.interface";

export interface QuotationInterface{
    uuid: string;
    number: string;
    date: Date;
    clientUuid: string;
    quotationStatusUuid: string;
    condition: boolean;
    createdAt: Date;
    updatedAt: Date;
    client: ClientInterface;
    quotationStatus: QuotationStatusInterface;
    quotationDetails: QuotationDetailInterface[];
    pagination: PaginationInterface;
}