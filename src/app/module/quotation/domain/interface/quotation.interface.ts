import { ClientInterface as ClientClientInterface } from "src/app/module/client/domain/interface/client.interface";

export interface ClientInterface extends Partial<ClientClientInterface> { }

export type QuotationCreateDetailInterface = Pick<
    QuotationDetailInterface,
    'amount' |
    'description' |
    'price' |
    'productUuid' |
    'measureUnitUuid' |
    'priceCategoryUuid'
>;
export interface QuotationCreateInterface
    extends Pick<
        QuotationInterface,
        'number' |
        'date' |
        'clientUuid'
    > {
    quotationDetails: QuotationCreateDetailInterface[];

}

export interface QuotationInterface {
    uuid: string;
    number: string;
    date: Date; 
    clientUuid: string;
    quotationStatusUuid: string;
    condition: boolean;
    createdAt: Date;
    updatedAt: Date;
    client?: ClientInterface;
    quotationStatus?: QuotationStatus;
    quotationDetails?: QuotationDetailInterface[];
}

export interface QuotationDetailInterface {
    amount: number;
    description: string;
    price: number;
    productUuid: string;
    measureUnitUuid: string;
    priceCategoryUuid: string;
    condition: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface QuotationStatus {
    uuid: string;
    keyName: string;
    name: string;
    condition: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface PaginationInterface {
    limit?: number;
    offset?: number;
}

export interface FindInterface extends PaginationInterface { };