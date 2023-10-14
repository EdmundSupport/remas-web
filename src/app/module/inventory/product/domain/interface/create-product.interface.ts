import { ProductDetailInterface, ProductInterface } from "./product.interface";

export interface CreateProductDetailInterface
    extends Partial<
        Omit<ProductDetailInterface, 'description' | 'amount' | 'price' | 'productUuid' | 'measureUnitUuid' | 'priceCategoryUuid'>> {
    description: string;
    amount: string;
    price: string;
    productUuid: string;
    measureUnitUuid: string;
    priceCategoryUuid: string;
}
export interface CreateProductInterface
    extends Partial<
        Omit<ProductInterface, 'productDetails' | 'number' | 'date' | 'clientUuid'>> {
    number: string;
    date: Date;
    clientUuid: string;
    productDetails: CreateProductDetailInterface[];
}