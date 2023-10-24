import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { WarehouseDto } from './warehouse.dto';

import { EventDto } from './event.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class WarehouseEventDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	eventUuid: string;

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
	event: EventDto;

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}