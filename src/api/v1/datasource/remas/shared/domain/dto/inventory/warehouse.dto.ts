import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { VehicleDto } from './vehicle.dto';

import { WarehouseVehicleDto } from './warehouse-vehicle.dto';

import { EventDto } from './event.dto';

import { WarehouseEventDto } from './warehouse-event.dto';

import { AddressDto } from './../contact/address.dto';

import { WarehouseAddressDto } from './warehouse-address.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class WarehouseDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	addressUuid: string;

	@IsOptional()
	@IsString()
	warehouseTypeUuid: string;

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
	@Type(()=>VehicleDto)
	vehicles: VehicleDto[];

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>EventDto)
	events: EventDto[];

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>AddressDto)
	addresses: AddressDto[];

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>WarehouseVehicleDto)
	warehouseVehicles: WarehouseVehicleDto[];

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>WarehouseEventDto)
	warehouseEvents: WarehouseEventDto[];

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>WarehouseAddressDto)
	warehouseAddresses: WarehouseAddressDto[];

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}