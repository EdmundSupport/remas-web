import { ProductInterface } from './../inventory/product.interface';

import { MaintenanceStepInterface } from './maintenance-step.interface';

import { MeasureUnitInterface } from './../inventory/measure-unit.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface MaintenanceStepDetailInterface{
	uuid: string;

	amount: string;

	price: string;

	maintenanceStepUuid: string;

	productUuid: string;

	measureUnitUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	product: ProductInterface;

	maintenanceStep: MaintenanceStepInterface;

	measureUnit: MeasureUnitInterface;

	pagination: PaginationInterface;
}