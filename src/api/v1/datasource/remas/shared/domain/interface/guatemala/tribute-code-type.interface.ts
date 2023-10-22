import { TributeInterface } from './tribute.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface TributeCodeTypeInterface{
	uuid: string;

	keyName: string;

	name: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	tributes: TributeInterface[];

	pagination: PaginationInterface;
}