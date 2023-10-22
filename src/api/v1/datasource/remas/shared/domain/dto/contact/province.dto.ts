import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { CountryDto } from './country.dto';

import { CityDto } from './city.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class ProvinceDto{
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
	countryUuid: string;

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
	country: CountryDto;

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>CityDto)
	cities: CityDto[];

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}