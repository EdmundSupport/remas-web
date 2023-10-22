import { ChargeInterface } from './charge.interface';

import { ProductInterface } from './product.interface';

import { MeasureUnitInterface } from './measure-unit.interface';

import { ChargeDetailInterface } from './charge-detail.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface ChargeDetailScheduledInterface{
	uuid: string;

	chargeUuid: string;

	amount: string;

	productUuid: string;

	measureUnitUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	charge: ChargeInterface;

	product: ProductInterface;

	measureUnit: MeasureUnitInterface;

	chargeDetails: ChargeDetailInterface[];

	pagination: PaginationInterface;
}