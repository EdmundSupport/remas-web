import { ProductPriceInterface } from './product-price.interface';

import { ProductInterface } from './product.interface';

import { ProductPackageInterface } from './product-package.interface';

import { PaginationInterface } from './pagination.interface';
export interface PriceCategoryInterface{
	uuid: string;

	code: string;

	name: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	productPrices: ProductPriceInterface[];

	products: ProductInterface[];

	productPackages: ProductPackageInterface[];

	pagination: PaginationInterface;
}