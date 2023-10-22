import { MaintenanceInterface } from './maintenance.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface MaintenanceStatusInterface{
	uuid: string;

	keyName: string;

	name: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	maintenances: MaintenanceInterface[];

	pagination: PaginationInterface;
}