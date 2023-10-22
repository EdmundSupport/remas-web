import { ChargeStatusInterface } from './charge-status.interface';

import { UserInterface } from './../aaa/user.interface';

import { ChargeDetailScheduledInterface } from './charge-detail-scheduled.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface ChargeInterface{
	uuid: string;

	number: string;

	dateStartScheduled: Date;

	dateEndScheduled: Date;

	dateStart: Date;

	dateEnd: Date;

	userUuid: string;

	chargeStatusUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	chargeStatus: ChargeStatusInterface;

	user: UserInterface;

	chargeDetailScheduleds: ChargeDetailScheduledInterface[];

	pagination: PaginationInterface;
}