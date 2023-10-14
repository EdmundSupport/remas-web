import { ClientInterface } from "src/app/datasource/remas/domain/interface/client.interface";

export type ProductCreateDetailInterface = Pick<
    ProductDetailInterface,
    'amount' |
    'description' |
    'price' |
    'productUuid' |
    'measureUnitUuid' |
    'priceCategoryUuid'
>;
export interface ProductCreateInterface
    extends Pick<
        ProductInterface,
        'number' |
        'date' |
        'clientUuid'
    > {
    productDetails: ProductCreateDetailInterface[];

}

export interface ProductInterface {
    uuid: string;
    number: string;
    date: Date; 
    clientUuid: string;
    productStatusUuid: string;
    condition: boolean;
    createdAt: Date;
    updatedAt: Date;
    client?: ClientInterface;
    productStatus?: ProductStatus;
    productDetails?: ProductDetailInterface[];
}

export interface ProductDetailInterface {
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

export interface ProductStatus {
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