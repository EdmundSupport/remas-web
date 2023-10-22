import { QuotationInterface } from './quotation.interface';

import { TributeInterface } from './../identity/tribute.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
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