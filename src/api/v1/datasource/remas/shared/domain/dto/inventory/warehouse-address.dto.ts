import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { WarehouseDto } from './warehouse.dto';

import { AddressDto } from './../contact/address.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class WarehouseAddressDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	addressUuid: string;

	@IsOptional()
	@IsString()
	warehouseUuid: string;

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
	warehouse: WarehouseDto;

	@IsOptional()
	@IsObject()
	address: AddressDto;

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}