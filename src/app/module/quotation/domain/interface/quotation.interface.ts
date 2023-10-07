export class QuotationInterface {
    uuid?: string;
    number?: string;
    date?: Date;
    clientUuid?: string;
    quotationStatusUuid?: string;
    condition?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    // client?: Client;
    // quotationStatus?: QuotationStatus;
    // quotationDetails?: QuotationDetail[];
}