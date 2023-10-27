import { MaintenanceInterface } from './maintenance.interface';

import { MaintenanceStepDetailInterface } from './maintenance-step-detail.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface MaintenanceStepInterface{
	uuid: string;

	maintenanceUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	maintenance: MaintenanceInterface;

	maintenanceStepDetails: MaintenanceStepDetailInterface[];

	pagination: PaginationInterface;
}