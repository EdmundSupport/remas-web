import { ProductInterface } from './product.interface';

import { MeasureUnitInterface } from './measure-unit.interface';

import { PriceCategoryInterface } from './price-category.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface ProductPriceInterface{
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

	priceCategory: PriceCategoryInterface;

	pagination: PaginationInterface;
}