import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { MaintenanceDto } from './maintenance.dto';

import { QuotationDto } from './quotation.dto';
import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';

export class QuotationMaintenanceDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	quotationUuid: string;

	@IsOptional()
	@IsString()
	maintenanceUuid: string;

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
	maintenance: MaintenanceDto;

	@IsOptional()
	@IsObject()
	quotation: QuotationDto;

	@IsOptional()
    @IsObject()
    pagination: PaginationDto;
}