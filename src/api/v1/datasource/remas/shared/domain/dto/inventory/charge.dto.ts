import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { ChargeStatusDto } from './charge-status.dto';

import { UserDto } from './../aaa/user.dto';

import { ChargeDetailScheduledDto } from './charge-detail-scheduled.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class ChargeDto{
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
	chargeStatusUuid: string;

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
	chargeStatus: ChargeStatusDto;

	@IsOptional()
	@IsObject()
	user: UserDto;

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>ChargeDetailScheduledDto)
	chargeDetailScheduleds: ChargeDetailScheduledDto[];

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}