import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { CompanyDto } from './company.dto';

import { ClientDto } from './../billing/client.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class TributeDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	code: string;

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
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>CompanyDto)
	companies: CompanyDto[];

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>ClientDto)
	clients: ClientDto[];

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}