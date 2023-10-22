import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { BinnacleDto } from './binnacle.dto';

import { ClientDto } from './client.dto';

import { MaintenanceDto } from './maintenance.dto';

import { MaintenanceStatusDto } from './maintenance-status.dto';

import { MaintenanceStepDto } from './maintenance-step.dto';

import { MaintenanceStepDetailDto } from './maintenance-step-detail.dto';

import { QuotationDto } from './quotation.dto';

import { QuotationChargeDto } from './quotation-charge.dto';

import { QuotationDetailDto } from './quotation-detail.dto';

import { QuotationMaintenanceDto } from './quotation-maintenance.dto';

import { QuotationStatusDto } from './quotation-status.dto';

import { SupplierDto } from './supplier.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class IndexDto{
	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}