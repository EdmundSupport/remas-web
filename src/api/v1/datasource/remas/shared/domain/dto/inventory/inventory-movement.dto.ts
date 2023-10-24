import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { QuotationDetailDto } from './../billing/quotation-detail.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class InventoryMovementDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	amount: string;

	@IsOptional()
	@IsDate()
	date: Date;

	@IsOptional()
	@IsString()
	warehouseOriginUuid: string;

	@IsOptional()
	@IsString()
	originUuid: string;

	@IsOptional()
	@IsString()
	warehouseDetinyUuid: string;

	@IsOptional()
	@IsString()
	destinyUuid: string;

	@IsOptional()
	@IsString()
	productUuid: string;

	@IsOptional()
	@IsString()
	measureUnitUuid: string;

	@IsOptional()
	@IsString()
	referenceSchema: string;

	@IsOptional()
	@IsString()
	referenceTable: string;

	@IsOptional()
	@IsString()
	referenceUuid: string;

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
	quotationDetail: QuotationDetailDto;

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}