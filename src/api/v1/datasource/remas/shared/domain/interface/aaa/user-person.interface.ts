import { UserInterface } from './user.interface';

import { PersonInterface } from './../identity/person.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
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