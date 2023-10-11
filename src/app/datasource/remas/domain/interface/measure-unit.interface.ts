import { MeasureInterface } from "./measure.interface";
import { PaginationInterface } from "./pagination.interface";
import { ProductPriceInterface } from "./product-price.interface";

export interface MeasureUnitInterface {
    uuid: string;
    keyName: string;
    name: string;
    parentUuid: string;
    measureUuid: string;
    condition: boolean;
    createdAt: Date;
    updatedAt: Date;
    measure: MeasureInterface;
    measureUnits: MeasureUnitInterface[];
    measureUnit: MeasureUnitInterface;
    productPrices: ProductPriceInterface[];
    pagination: PaginationInterface
}