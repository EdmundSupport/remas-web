import { QuotationInterface } from './quotation.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface QuotationStatusInterface{
	uuid: string;

	keyName: string;

	name: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	quotations: QuotationInterface[];

	pagination: PaginationInterface;
}