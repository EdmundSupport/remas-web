import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { TokenDisabledDto } from './token-disabled.dto';

import { UserPersonDto } from './user-person.dto';

import { BinnacleDto } from './binnacle.dto';

import { ModuleDto } from './module.dto';

import { PrivilegeDto } from './privilege.dto';

import { RoleDto } from './role.dto';

import { UserDto } from './user.dto';

import { SessionDto } from './session.dto';

import { SessionTypeDto } from './session-type.dto';

import { PermissionDto } from './permission.dto';

import { RolePermissionDto } from './role-permission.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class IndexDto{
	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}