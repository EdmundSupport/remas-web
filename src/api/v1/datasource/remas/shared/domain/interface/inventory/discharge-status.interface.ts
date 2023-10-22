import { DischargeInterface } from './discharge.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface DischargeStatusInterface{
	uuid: string;

	keyName: string;

	name: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	discharges: DischargeInterface[];

	pagination: PaginationInterface;
}