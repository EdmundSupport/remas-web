import { CompanyInterface } from './company.interface';

import { PaginationInterface } from './pagination.interface';
export interface BranchInterface{
	uuid: string;

	name: string;

	companyUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	company: CompanyInterface;

	pagination: PaginationInterface;
}