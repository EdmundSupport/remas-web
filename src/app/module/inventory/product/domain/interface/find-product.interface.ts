import { ProductInterface } from "src/app/datasource/remas/domain/interface/product.interface";

export interface FindProductInterface extends Omit<ProductInterface, 'date'> {
    date: Date | [Date, Date]
}