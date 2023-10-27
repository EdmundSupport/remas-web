import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { MeasureDto } from './measure.dto';

import { ProductPriceDto } from './product-price.dto';

import { ProductMaintenanceStepDetailDto } from './product-maintenance-step-detail.dto';

import { ChargeDetailScheduledDto } from './charge-detail-scheduled.dto';

import { ChargeDetailDto } from './charge-detail.dto';

import { DischargeDetailScheduledDto } from './discharge-detail-scheduled.dto';

import { DischargeDetailDto } from './discharge-detail.dto';

import { ProductPackageDto } from './product-package.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class MeasureUnitDto{
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
	@IsString()
	factorConversion: string;

	@IsOptional()
	@IsString()
	parentUuid: string;

	@IsOptional()
	@IsString()
	measureUuid: string;

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
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>ProductPriceDto)
	productPrices: ProductPriceDto[];

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
	@Type(()=>ChargeDetailDto)
	chargeDetails: ChargeDetailDto[];

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>DischargeDetailScheduledDto)
	dischargeDetailScheduleds: DischargeDetailScheduledDto[];

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>DischargeDetailDto)
	dischargeDetails: DischargeDetailDto[];

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>ProductPackageDto)
	productPackages: ProductPackageDto[];

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}