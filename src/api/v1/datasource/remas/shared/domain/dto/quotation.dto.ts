import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { ClientDto } from './client.dto';

import { QuotationStatusDto } from './quotation-status.dto';

import { QuotationDetailDto } from './quotation-detail.dto';

import { QuotationMaintenanceDto } from './quotation-maintenance.dto';
import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
import { QuotationCharge } from '../model/billing/quotation-charge';

export class QuotationDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	number: string;

	@IsOptional()
	@IsDate()
	date: Date;

	@IsOptional()
	@IsString()
	clientUuid: string;

	@IsOptional()
	@IsString()
	quotationStatusUuid: string;

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
	client: ClientDto;

	@IsOptional()
	@IsObject()
	quotationStatus: QuotationStatusDto;

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>QuotationDetailDto)
	quotationDetails: QuotationDetailDto[];

	@IsOptional()
	@IsObject()
	quotationMaintenance: QuotationMaintenanceDto;

	@IsOptional()
	@IsObject()
	quotationCharge: QuotationCharge;

	@IsOptional()
    @IsObject()
    pagination: PaginationDto;
}