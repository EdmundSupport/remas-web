import { ClientInterface } from "src/app/datasource/remas/domain/interface/client.interface";

export type RoleCreateDetailInterface = Pick<
    RoleDetailInterface,
    'amount' |
    'description' |
    'price' |
    'roleUuid' |
    'measureUnitUuid' |
    'priceCategoryUuid'
>;
export interface RoleCreateInterface
    extends Pick<
        RoleInterface,
        'number' |
        'date' |
        'clientUuid'
    > {
    roleDetails: RoleCreateDetailInterface[];

}

export interface RoleInterface {
    uuid: string;
    number: string;
    date: Date; 
    clientUuid: string;
    roleStatusUuid: string;
    condition: boolean;
    createdAt: Date;
    updatedAt: Date;
    client?: ClientInterface;
    roleStatus?: RoleStatus;
    roleDetails?: RoleDetailInterface[];
}

export interface RoleDetailInterface {
    amount: number;
    description: string;
    price: number;
    roleUuid: string;
    measureUnitUuid: string;
    priceCategoryUuid: string;
    condition: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface RoleStatus {
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