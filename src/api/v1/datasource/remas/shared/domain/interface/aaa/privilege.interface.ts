import { ModuleInterface } from './module.interface';

import { PermissionInterface } from './permission.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface PrivilegeInterface{
	uuid: string;

	keyName: string;

	name: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	modules: ModuleInterface[];

	permissions: PermissionInterface[];

	pagination: PaginationInterface;
}