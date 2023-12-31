import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { DischargeDto } from './discharge.dto';

import { ProductDto } from './product.dto';

import { MeasureUnitDto } from './measure-unit.dto';

import { DischargeDetailDto } from './discharge-detail.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class DischargeDetailScheduledDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	dischargeUuid: string;

	@IsOptional()
	@IsString()
	amount: string;

	@IsOptional()
	@IsString()
	productUuid: string;

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
	discharge: DischargeDto;

	@IsOptional()
	@IsObject()
	product: ProductDto;

	@IsOptional()
	@IsObject()
	measureUnit: MeasureUnitDto;

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>DischargeDetailDto)
	dischargeDetails: DischargeDetailDto[];

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}