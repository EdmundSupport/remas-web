import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { PrivilegeDto } from './privilege.dto';

import { PermissionDto } from './permission.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class ModuleDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	keyName: string;

	@IsOptional()
	@IsString()
	name: string;

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
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>PrivilegeDto)
	privileges: PrivilegeDto[];

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>PermissionDto)
	permissions: PermissionDto[];

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}