import { RoleInterface } from './role.interface';

import { PermissionInterface } from './permission.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface RolePermissionInterface{
	uuid: string;

	permissionUuid: string;

	roleUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	role: RoleInterface;

	permission: PermissionInterface;

	pagination: PaginationInterface;
}