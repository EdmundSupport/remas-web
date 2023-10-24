import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { WarehouseDto } from './warehouse.dto';

import { WarehouseEventDto } from './warehouse-event.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class EventDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsDate()
	dateStart: Date;

	@IsOptional()
	@IsDate()
	dateEnd: Date;

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
	@Type(()=>WarehouseEventDto)
	warehouseEvents: WarehouseEventDto[];

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}