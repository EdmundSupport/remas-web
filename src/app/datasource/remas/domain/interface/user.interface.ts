import { SessionInterface } from './session.interface';

import { RoleInterface } from './role.interface';

import { PersonInterface } from './person.interface';

import { UserPersonInterface } from './user-person.interface';

import { PaginationInterface } from './pagination.interface';
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