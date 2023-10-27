import { ProductInterface } from './product.interface';

import { MeasureUnitInterface } from './measure-unit.interface';

import { ProductMaintenanceStepInterface } from './product-maintenance-step.interface';

import { PaginationInterface } from './pagination.interface';
export interface ProductMaintenanceStepDetailInterface{
	uuid: string;

	amount: string;

	price: string;

	productMaintenanceStepUuid: string;

	productUuid: string;

	measureUnitUuid: string;

	inventoryMovementUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	product: ProductInterface;

	measureUnit: MeasureUnitInterface;

	productMaintenanceStep: ProductMaintenanceStepInterface;

	pagination: PaginationInterface;
}