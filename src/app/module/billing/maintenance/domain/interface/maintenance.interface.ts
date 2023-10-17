import { ClientInterface } from "src/app/datasource/remas/domain/interface/client.interface";

export type MaintenanceCreateDetailInterface = Pick<
    MaintenanceDetailInterface,
    'amount' |
    'description' |
    'price' |
    'maintenanceUuid' |
    'measureUnitUuid' |
    'priceCategoryUuid'
>;
export interface MaintenanceCreateInterface
    extends Pick<
        MaintenanceInterface,
        'number' |
        'date' |
        'clientUuid'
    > {
    maintenanceDetails: MaintenanceCreateDetailInterface[];

}

export interface MaintenanceInterface {
    uuid: string;
    number: string;
    date: Date; 
    clientUuid: string;
    maintenanceStatusUuid: string;
    condition: boolean;
    createdAt: Date;
    updatedAt: Date;
    client?: ClientInterface;
    maintenanceStatus?: MaintenanceStatus;
    maintenanceDetails?: MaintenanceDetailInterface[];
}

export interface MaintenanceDetailInterface {
    amount: number;
    description: string;
    price: number;
    maintenanceUuid: string;
    measureUnitUuid: string;
    priceCategoryUuid: string;
    condition: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface MaintenanceStatus {
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