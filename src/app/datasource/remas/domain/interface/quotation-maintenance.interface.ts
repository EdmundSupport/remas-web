import { MaintenanceInterface } from './maintenance.interface';

import { QuotationInterface } from './quotation.interface';

import { PaginationInterface } from './pagination.interface';
export interface QuotationMaintenanceInterface{
	uuid: string;

	quotationUuid: string;

	maintenanceUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	maintenance: MaintenanceInterface;

	quotation: QuotationInterface;

	pagination: PaginationInterface;
}