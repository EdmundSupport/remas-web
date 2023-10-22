import { SessionTypeInterface } from './session-type.interface';

import { UserInterface } from './user.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface SessionInterface{
	uuid: string;

	userUuid: string;

	sessionTypeUuid: string;

	token: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	sessionType: SessionTypeInterface;

	user: UserInterface;

	pagination: PaginationInterface;
}