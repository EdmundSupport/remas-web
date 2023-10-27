import { UserInterface } from './user.interface';

import { PersonInterface } from './person.interface';

import { PaginationInterface } from './pagination.interface';
export interface UserPersonInterface{
	uuid: string;

	userUuid: string;

	personUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	user: UserInterface;

	pagination: PaginationInterface;
}