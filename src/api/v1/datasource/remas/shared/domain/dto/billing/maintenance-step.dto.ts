import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { MaintenanceDto } from './maintenance.dto';

import { MaintenanceStepDetailDto } from './maintenance-step-detail.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class MaintenanceStepDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	maintenanceUuid: string;
	
	@IsOptional()
	@IsString()
	order: string;

	@IsOptional()
	@IsString()
	description: string;

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
	maintenance: MaintenanceDto;

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>MaintenanceStepDetailDto)
	maintenanceStepDetails: MaintenanceStepDetailDto[];

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}