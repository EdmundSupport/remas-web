import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { WarehouseDto } from './warehouse.dto';

import { VehicleDto } from './vehicle.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class WarehouseVehicleDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	vehicleUuid: string;

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
	vehicle: VehicleDto;

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}