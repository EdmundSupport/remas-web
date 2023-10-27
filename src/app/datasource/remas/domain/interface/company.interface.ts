import { TributeInterface } from './tribute.interface';

import { BranchInterface } from './branch.interface';

import { PaginationInterface } from './pagination.interface';
export interface CompanyInterface{
	uuid: string;

	name: string;

	tributeUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	tribute: TributeInterface;

	branches: BranchInterface[];

	pagination: PaginationInterface;
}