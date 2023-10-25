import { MaintenanceInterface } from './maintenance.interface';

import { ProductMaintenanceStepInterface } from './../inventory/product-maintenance-step.interface';

import { MaintenanceStepDetailInterface } from './maintenance-step-detail.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface MaintenanceStepInterface{
	uuid: string;

	maintenanceUuid: string;

	productMaintenanceStepUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	maintenance: MaintenanceInterface;

	productMaintenanceStep: ProductMaintenanceStepInterface;

	maintenanceStepDetails: MaintenanceStepDetailInterface[];

	pagination: PaginationInterface;
}