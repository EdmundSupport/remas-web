import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { QuotationDto } from './quotation.dto';

import { InventoryMovementDto } from './../inventory/inventory-movement.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class QuotationDetailDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	amount: string;

	@IsOptional()
	@IsString()
	description: string;

	@IsOptional()
	@IsString()
	price: string;

	@IsOptional()
	@IsString()
	quotationUuid: string;

	@IsOptional()
	@IsString()
	productUuid: string;

	@IsOptional()
	@IsString()
	measureUnitUuid: string;

	@IsOptional()
	@IsString()
	priceCategoryUuid: string;

	@IsOptional()
	@IsString()
	inventoryMovementUuid: string;

	@IsOptional()
	@IsString()
	parentUuid: string;

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
	quotation: QuotationDto;

	@IsOptional()
	@IsObject()
	inventoryMovement: InventoryMovementDto;

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}