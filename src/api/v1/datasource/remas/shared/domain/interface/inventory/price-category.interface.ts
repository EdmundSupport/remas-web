import { ProductPriceInterface } from './product-price.interface';

import { ProductInterface } from './product.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
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