import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { BinnacleDto } from './binnacle.dto';

import { CountryDto } from './country.dto';

import { ProvinceDto } from './province.dto';

import { CityDto } from './city.dto';

import { AddressDto } from './address.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class IndexDto{
	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}