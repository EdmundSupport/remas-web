import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { WarehouseDto } from './warehouse.dto';

import { WarehouseVehicleDto } from './warehouse-vehicle.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class VehicleDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	plate: string;

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
	@Type(()=>WarehouseDto)
	warehouses: WarehouseDto[];

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>WarehouseVehicleDto)
	warehouseVehicles: WarehouseVehicleDto[];

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}