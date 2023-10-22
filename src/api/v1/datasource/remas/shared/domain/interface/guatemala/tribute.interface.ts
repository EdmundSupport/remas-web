import { TributeCodeTypeInterface } from './tribute-code-type.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface TributeInterface{
	uuid: string;

	tributeUuid: string;

	tributeCodeTypeUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	tributeCodeType: TributeCodeTypeInterface;

	pagination: PaginationInterface;
}