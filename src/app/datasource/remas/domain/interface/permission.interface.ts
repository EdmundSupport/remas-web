import { ModuleInterface } from './module.interface';

import { PrivilegeInterface } from './privilege.interface';

import { RoleInterface } from './role.interface';

import { RolePermissionInterface } from './role-permission.interface';

import { PaginationInterface } from './pagination.interface';
export interface PermissionInterface{
	uuid: string;

	keyName: string;

	moduleUuid: string;

	privilegeUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	module: ModuleInterface;

	privilege: PrivilegeInterface;

	roles: RoleInterface[];

	rolePermissions: RolePermissionInterface[];

	pagination: PaginationInterface;
}