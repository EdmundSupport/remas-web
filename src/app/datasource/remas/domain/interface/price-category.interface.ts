import { PaginationInterface } from "./pagination.interface";
import { ProductPriceInterface } from "./product-price.interface";
import { ProductInterface } from "./product.interface";

export interface PriceCategoryInterface{
   uuid: string;
   code: string;
   name: string;
   condition: boolean;
   createdAt: Date;
   updatedAt: Date;
   productPrices: ProductPriceInterface[];
   products: ProductInterface[];
   pagination: PaginationInterface;
}