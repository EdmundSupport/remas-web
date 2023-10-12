import { PaginationInterface } from "./pagination.interface";

export interface QuotationStatusInterface{
    uuid: string;
    keyName: string;
    name: string;
    condition: boolean;
    createdAt: Date;
    updatedAt: Date;
    pagination: PaginationInterface;
}