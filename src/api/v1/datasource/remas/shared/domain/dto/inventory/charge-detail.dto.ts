import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { ChargeDetailScheduledDto } from './charge-detail-scheduled.dto';

import { MeasureUnitDto } from './measure-unit.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class ChargeDetailDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	chargeDetailScheduledUuid: string;

	@IsOptional()
	@IsString()
	amount: string;

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
	chargeDetailScheduled: ChargeDetailScheduledDto;

	@IsOptional()
	@IsObject()
	measureUnit: MeasureUnitDto;

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}