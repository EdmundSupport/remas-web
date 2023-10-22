import { ClientInterface } from './client.interface';

import { QuotationStatusInterface } from './quotation-status.interface';

import { QuotationDetailInterface } from './quotation-detail.interface';

import { QuotationMaintenanceInterface } from './quotation-maintenance.interface';

import { QuotationChargeInterface } from './quotation-charge.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface QuotationInterface{
	uuid: string;

	number: string;

	date: Date;

	clientUuid: string;

	quotationStatusUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	client: ClientInterface;

	quotationStatus: QuotationStatusInterface;

	quotationDetails: QuotationDetailInterface[];

	quotationMaintenance: QuotationMaintenanceInterface;

	quotationCharge: QuotationChargeInterface;

	pagination: PaginationInterface;
}