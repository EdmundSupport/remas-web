import { DischargeInterface } from './discharge.interface';

import { ProductInterface } from './product.interface';

import { MeasureUnitInterface } from './measure-unit.interface';

import { DischargeDetailInterface } from './discharge-detail.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface DischargeDetailScheduledInterface{
	uuid: string;

	dischargeUuid: string;

	amount: string;

	productUuid: string;

	measureUnitUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	discharge: DischargeInterface;

	product: ProductInterface;

	measureUnit: MeasureUnitInterface;

	dischargeDetails: DischargeDetailInterface[];

	pagination: PaginationInterface;
}