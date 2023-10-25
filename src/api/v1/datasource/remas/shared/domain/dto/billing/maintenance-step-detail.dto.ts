import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { ProductMaintenanceStepDetailDto } from './../inventory/product-maintenance-step-detail.dto';

import { MaintenanceStepDto } from './maintenance-step.dto';

import { MeasureUnitDto } from './../inventory/measure-unit.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class MaintenanceStepDetailDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	amount: string;

	@IsOptional()
	@IsString()
	price: string;

	@IsOptional()
	@IsString()
	maintenanceStepUuid: string;

	@IsOptional()
	@IsString()
	productMaintenanceStepDetailUuid: string;

	@IsOptional()
	@IsString()
	measureUnitUuid: string;

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
	productMaintenanceStepDetail: ProductMaintenanceStepDetailDto;

	@IsOptional()
	@IsObject()
	maintenanceStep: MaintenanceStepDto;

	@IsOptional()
	@IsObject()
	measureUnit: MeasureUnitDto;

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}