import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { MeasureDto } from './measure.dto';

import { ProductTypeDto } from './product-type.dto';

import { ProductPriceDto } from './product-price.dto';

import { ProductMaintenanceStepDto } from './product-maintenance-step.dto';

import { ProductMaintenanceStepDetailDto } from './product-maintenance-step-detail.dto';

import { ChargeDetailScheduledDto } from './charge-detail-scheduled.dto';

import { DischargeDetailScheduledDto } from './discharge-detail-scheduled.dto';

import { ProductPackageDto } from './product-package.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class ProductDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	sku: string;

	@IsOptional()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	description: string;

	@IsOptional()
	@IsString()
	priceCost: string;

	@IsOptional()
	@IsString()
	parentUuid: string;

	@IsOptional()
	@IsString()
	measureUuid: string;

	@IsOptional()
	@IsString()
	productTypeUuid: string;

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
	measure: MeasureDto;

	@IsOptional()
	@IsObject()
	productType: ProductTypeDto;

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>ProductPriceDto)
	productPrices: ProductPriceDto[];

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>ProductMaintenanceStepDto)
	productMaintenanceSteps: ProductMaintenanceStepDto[];

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>ProductMaintenanceStepDetailDto)
	productMaintenanceStepDetails: ProductMaintenanceStepDetailDto[];

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>ChargeDetailScheduledDto)
	chargeDetailScheduleds: ChargeDetailScheduledDto[];

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>DischargeDetailScheduledDto)
	dischargeDetailScheduleds: DischargeDetailScheduledDto[];

	@IsOptional()
	@IsObject()
	productPackage: ProductPackageDto;

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>ProductPackageDto)
	productPackages: ProductPackageDto[];

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}