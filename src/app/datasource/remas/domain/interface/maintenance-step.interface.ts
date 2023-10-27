import { MaintenanceInterface } from './maintenance.interface';

import { MaintenanceStepDetailInterface } from './maintenance-step-detail.interface';

import { PaginationInterface } from './pagination.interface';
export interface MaintenanceStepInterface{
	uuid: string;

	maintenanceUuid: string;

	order: string;

	description: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	maintenance: MaintenanceInterface;

	maintenanceStepDetails: MaintenanceStepDetailInterface[];

	pagination: PaginationInterface;
}