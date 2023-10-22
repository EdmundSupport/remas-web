import { CompanyInterface } from './company.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
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