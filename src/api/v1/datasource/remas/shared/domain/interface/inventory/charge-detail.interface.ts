import { ChargeDetailScheduledInterface } from './charge-detail-scheduled.interface';

import { MeasureUnitInterface } from './measure-unit.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface ChargeDetailInterface{
	uuid: string;

	chargeDetailScheduledUuid: string;

	amount: string;

	measureUnitUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	chargeDetailScheduled: ChargeDetailScheduledInterface;

	measureUnit: MeasureUnitInterface;

	pagination: PaginationInterface;
}