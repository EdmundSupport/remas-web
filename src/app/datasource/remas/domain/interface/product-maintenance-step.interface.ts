import { ProductInterface } from './product.interface';

import { ProductMaintenanceStepDetailInterface } from './product-maintenance-step-detail.interface';

import { PaginationInterface } from './pagination.interface';
export interface ProductMaintenanceStepInterface{
	uuid: string;

	order: string;

	description: string;

	durationMs: string;

	productUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	product: ProductInterface;

	productMaintenanceStepDetails: ProductMaintenanceStepDetailInterface[];

	pagination: PaginationInterface;
}