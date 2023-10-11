import { MeasureUnitInterface } from "./measure-unit.interface";
import { ProductInterface } from "./product.interface";

export interface ProductPriceInterface {
    uuid: string;

    amount: string;

    productUuid: string;

    measureUnitUuid: string;

    priceCategoryUuid: string;

    condition: boolean;

    createdAt: Date;

    updatedAt: Date;

    product: ProductInterface;

    measureUnit: MeasureUnitInterface;
}