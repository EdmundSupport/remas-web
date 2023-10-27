import { DischargeDetailScheduledInterface } from './discharge-detail-scheduled.interface';

import { MeasureUnitInterface } from './measure-unit.interface';

import { PaginationInterface } from './pagination.interface';
export interface DischargeDetailInterface{
	uuid: string;

	dischargeDetailScheduledUuid: string;

	amount: string;

	measureUnitUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	dischargeDetailScheduled: DischargeDetailScheduledInterface;

	measureUnit: MeasureUnitInterface;

	pagination: PaginationInterface;
}