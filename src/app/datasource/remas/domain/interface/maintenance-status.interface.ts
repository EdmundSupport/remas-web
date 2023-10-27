import { MaintenanceInterface } from './maintenance.interface';

import { PaginationInterface } from './pagination.interface';
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