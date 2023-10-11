import { MeasureInterface } from "./measure.interface";
import { PaginationInterface } from "./pagination.interface";
import { ProductTypeInterface } from "./product-type.interface";

export interface ProductInterface {
        uuid: string;
        sku: string;
        name: string;
        description: string;
        parentUuid: null;
        measureUuid: string;
        productTypeUuid: string;
        condition: boolean;
        createdAt: Date;
        updatedAt: Date;
        productsChild: ProductInterface[];
        productParent: ProductInterface;
        measure: MeasureInterface;
        productType: ProductTypeInterface;
        pagination: PaginationInterface;
}