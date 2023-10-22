import { UserInterface } from './../aaa/user.interface';

import { MaintenanceStatusInterface } from './maintenance-status.interface';

import { MaintenanceStepInterface } from './maintenance-step.interface';

import { QuotationMaintenanceInterface } from './quotation-maintenance.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface MaintenanceInterface{
	uuid: string;

	number: string;

	dateStartScheduled: Date;

	dateEndScheduled: Date;

	dateStart: Date;

	dateEnd: Date;

	userUuid: string;

	productUuid: string;

	maintenanceStatusUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	user: UserInterface;

	maintenanceStatus: MaintenanceStatusInterface;

	maintenanceSteps: MaintenanceStepInterface[];

	quotationMaintenance: QuotationMaintenanceInterface;

	pagination: PaginationInterface;
}