import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { DischargeDetailScheduledDto } from './discharge-detail-scheduled.dto';

import { MeasureUnitDto } from './measure-unit.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class DischargeDetailDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	dischargeDetailScheduledUuid: string;

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
	dischargeDetailScheduled: DischargeDetailScheduledDto;

	@IsOptional()
	@IsObject()
	measureUnit: MeasureUnitDto;

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}