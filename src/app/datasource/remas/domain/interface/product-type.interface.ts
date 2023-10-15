import { PaginationInterface } from "./pagination.interface";
import { ProductInterface } from "./product.interface";

export interface ProductTypeInterface {
    uuid:      string;
    keyName:   string;
    name:      string;
    condition: boolean;
    createdAt: Date;
    updatedAt: Date;
    products: ProductInterface[];
    pagination: PaginationInterface;
}