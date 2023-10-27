import { UserInterface } from './user.interface';

import { ProductInterface } from './product.interface';

import { MaintenanceStatusInterface } from './maintenance-status.interface';

import { MaintenanceStepInterface } from './maintenance-step.interface';

import { QuotationMaintenanceInterface } from './quotation-maintenance.interface';

import { PaginationInterface } from './pagination.interface';
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

	product: ProductInterface;

	maintenanceStatus: MaintenanceStatusInterface;

	maintenanceSteps: MaintenanceStepInterface[];

	quotationMaintenance: QuotationMaintenanceInterface;

	pagination: PaginationInterface;
}