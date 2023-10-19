import { MaintenanceInterface } from './maintenance.interface';

import { QuotationInterface } from './quotation.interface';

export interface QuotationMaintenanceInterface{
	uuid: string;

	quotationUuid: string;

	maintenanceUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	maintenance: MaintenanceInterface;

	quotation: QuotationInterface;

}