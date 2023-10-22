import { CompanyInterface } from './company.interface';

import { ClientInterface } from './../billing/client.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface TributeInterface{
	uuid: string;

	code: string;

	countryUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	companies: CompanyInterface[];

	clients: ClientInterface[];

	pagination: PaginationInterface;
}