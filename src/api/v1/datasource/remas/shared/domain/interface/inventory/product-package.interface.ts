import { ProductInterface } from './product.interface';

import { MeasureUnitInterface } from './measure-unit.interface';

import { PriceCategoryInterface } from './price-category.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface ProductPackageInterface{
	uuid: string;

	amount: string;

	price: string;

	description: string;

	priceCategoryUuid: string;

	measureUnitUuid: string;

	parentUuid: string;

	productUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	productPackage: ProductInterface;

	productPackages: ProductInterface;

	measureUnit: MeasureUnitInterface;

	priceCategory: PriceCategoryInterface;

	pagination: PaginationInterface;
}