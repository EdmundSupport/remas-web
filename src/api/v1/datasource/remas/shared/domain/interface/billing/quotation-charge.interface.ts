import { QuotationInterface } from './quotation.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface QuotationChargeInterface{
	uuid: string;

	quotationUuid: string;

	chargeUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	quotation: QuotationInterface;

	pagination: PaginationInterface;
}