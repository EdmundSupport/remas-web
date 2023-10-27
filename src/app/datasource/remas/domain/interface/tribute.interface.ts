import { CompanyInterface } from './company.interface';

import { ClientInterface } from './client.interface';

import { PaginationInterface } from './pagination.interface';
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