import { MaintenanceInterface } from './maintenance.interface';

import { QuotationInterface } from './quotation.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
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