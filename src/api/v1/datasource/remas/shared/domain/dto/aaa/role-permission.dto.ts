import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { RoleDto } from './role.dto';

import { PermissionDto } from './permission.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class RolePermissionDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	permissionUuid: string;

	@IsOptional()
	@IsString()
	roleUuid: string;

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
	role: RoleDto;

	@IsOptional()
	@IsObject()
	permission: PermissionDto;

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}