import { PrivilegeInterface } from './privilege.interface';

import { PermissionInterface } from './permission.interface';

import { PaginationInterface } from './pagination.interface';
export interface ModuleInterface{
	uuid: string;

	keyName: string;

	name: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	privileges: PrivilegeInterface[];

	permissions: PermissionInterface[];

	pagination: PaginationInterface;
}