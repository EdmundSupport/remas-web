import { ProductInterface } from './product.interface';

import { MeasureUnitInterface } from './measure-unit.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface MeasureInterface{
	uuid: string;

	keyName: string;

	name: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	products: ProductInterface[];

	measureUnits: MeasureUnitInterface[];

	pagination: PaginationInterface;
}