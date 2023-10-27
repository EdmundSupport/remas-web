import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { UserDto } from './../aaa/user.dto';

import { ProductDto } from './../inventory/product.dto';

import { MaintenanceStatusDto } from './maintenance-status.dto';

import { MaintenanceStepDto } from './maintenance-step.dto';

import { QuotationMaintenanceDto } from './quotation-maintenance.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class MaintenanceDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	number: string;

	@IsOptional()
	@IsDate()
	dateStartScheduled: Date;

	@IsOptional()
	@IsDate()
	dateEndScheduled: Date;

	@IsOptional()
	@IsDate()
	dateStart: Date;

	@IsOptional()
	@IsDate()
	dateEnd: Date;

	@IsOptional()
	@IsString()
	userUuid: string;

	@IsOptional()
	@IsString()
	productUuid: string;

	@IsOptional()
	@IsString()
	maintenanceStatusUuid: string;

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
	user: UserDto;

	@IsOptional()
	@IsObject()
	product: ProductDto;

	@IsOptional()
	@IsObject()
	maintenanceStatus: MaintenanceStatusDto;

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>MaintenanceStepDto)
	maintenanceSteps: MaintenanceStepDto[];

	@IsOptional()
	@IsObject()
	quotationMaintenance: QuotationMaintenanceDto;

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}