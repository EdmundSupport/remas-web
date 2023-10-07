import { ClientInterface } from "./client.interface";

export interface QuotationInterface{
    uuid: string;
    date: Date;
    clientUuid: string;
    quotationStatusUuid: string;
    condition: boolean;
    createdAt: Date;
    updatedAt: Date;
    client: ClientInterface;
    // quotationStatus: QuotationStatus;
    // quotationDetails: QuotationDetail[];
}