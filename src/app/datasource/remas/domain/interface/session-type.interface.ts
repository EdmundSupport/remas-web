import { SessionInterface } from './session.interface';

import { PaginationInterface } from './pagination.interface';
export interface SessionTypeInterface{
	uuid: string;

	keyName: string;

	name: string;

	time: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	sessions: SessionInterface[];

	pagination: PaginationInterface;
}