import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { ProductDto } from './product.dto';

import { ProductMaintenanceStepDetailDto } from './product-maintenance-step-detail.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class ProductMaintenanceStepDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	order: string;

	@IsOptional()
	@IsString()
	description: string;

	@IsOptional()
	@IsString()
	durationMs: string;

	@IsOptional()
	@IsString()
	productUuid: string;

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
	product: ProductDto;

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>ProductMaintenanceStepDetailDto)
	productMaintenanceStepDetails: ProductMaintenanceStepDetailDto[];

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}