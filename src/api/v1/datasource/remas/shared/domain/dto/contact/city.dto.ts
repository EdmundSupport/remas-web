import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { ProvinceDto } from './province.dto';

import { AddressDto } from './address.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class CityDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	code: string;

	@IsOptional()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	provinceUuid: string;

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
	province: ProvinceDto;

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>AddressDto)
	addresses: AddressDto[];

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}