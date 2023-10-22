import { TokenDisabledInterface } from './token-disabled.interface';

import { UserPersonInterface } from './user-person.interface';

import { BinnacleInterface } from './binnacle.interface';

import { ModuleInterface } from './module.interface';

import { PrivilegeInterface } from './privilege.interface';

import { RoleInterface } from './role.interface';

import { UserInterface } from './user.interface';

import { SessionInterface } from './session.interface';

import { SessionTypeInterface } from './session-type.interface';

import { PermissionInterface } from './permission.interface';

import { RolePermissionInterface } from './role-permission.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface IndexInterface{
	pagination: PaginationInterface;
}