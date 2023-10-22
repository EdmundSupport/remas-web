import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { ModuleDto } from './module.dto';

import { PrivilegeDto } from './privilege.dto';

import { RoleDto } from './role.dto';

import { RolePermissionDto } from './role-permission.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class PermissionDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	keyName: string;

	@IsOptional()
	@IsString()
	moduleUuid: string;

	@IsOptional()
	@IsString()
	privilegeUuid: string;

	@IsOptional()
	@IsBoolean()
	condition: boolean;

	@IsOptional()
	@IsDate()
	createdAt: Date;

	@IsOptional()
	@IsDate()
	updatedAt: Date;

	@IsOptional()
	@IsObject()
	module: ModuleDto;

	@IsOptional()
	@IsObject()
	privilege: PrivilegeDto;

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>RoleDto)
	roles: RoleDto[];

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>RolePermissionDto)
	rolePermissions: RolePermissionDto[];

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}