import { ProductInterface } from './product.interface';

import { MaintenanceStepInterface } from './maintenance-step.interface';

import { MeasureUnitInterface } from './measure-unit.interface';

import { PaginationInterface } from './pagination.interface';
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