import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { ModuleDto } from './module.dto';

import { PermissionDto } from './permission.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class PrivilegeDto{
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
	@Type(()=>ModuleDto)
	modules: ModuleDto[];

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>PermissionDto)
	permissions: PermissionDto[];

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}