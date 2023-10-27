import { QuotationInterface } from './quotation.interface';

import { TributeInterface } from './tribute.interface';

import { PaginationInterface } from './pagination.interface';
export interface ClientInterface{
	uuid: string;

	tributeUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	quotations: QuotationInterface[];

	tribute: TributeInterface;

	pagination: PaginationInterface;
}