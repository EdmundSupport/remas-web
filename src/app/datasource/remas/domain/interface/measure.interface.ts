import { ProductInterface } from "src/app/module/inventory/product/domain/interface/product.interface";
import { MeasureUnitInterface } from "./measure-unit.interface";
import { PaginationInterface } from "./pagination.interface";

export interface MeasureInterface {
    uuid:      string;
    keyName:   string;
    name:      string;
    condition: boolean;
    createdAt: Date;
    updatedAt: Date;
    products: ProductInterface[];
    measureUnits: MeasureUnitInterface[];
    pagination: PaginationInterface;
}