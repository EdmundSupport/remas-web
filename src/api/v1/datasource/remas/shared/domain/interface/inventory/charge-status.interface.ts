import { ChargeInterface } from './charge.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface ChargeStatusInterface{
	uuid: string;

	keyName: string;

	name: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	charges: ChargeInterface[];

	pagination: PaginationInterface;
}