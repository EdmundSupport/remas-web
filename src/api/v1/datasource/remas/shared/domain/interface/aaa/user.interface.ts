import { SessionInterface } from './session.interface';

import { RoleInterface } from './role.interface';

import { PersonInterface } from './../identity/person.interface';

import { UserPersonInterface } from './user-person.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface UserInterface{
	uuid: string;

	name: string;

	password: string;

	condition: boolean;

	roleUuid: string;

	createdAt: Date;

	updatedAt: Date;

	sessions: SessionInterface[];

	role: RoleInterface;

	people: PersonInterface[];

	userPeople: UserPersonInterface[];

	pagination: PaginationInterface;
}