import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { BinnacleDto } from './binnacle.dto';

import { ChargeDto } from './charge.dto';

import { ChargeDetailDto } from './charge-detail.dto';

import { ChargeDetailScheduledDto } from './charge-detail-scheduled.dto';

import { ChargeStatusDto } from './charge-status.dto';

import { DischargeDto } from './discharge.dto';

import { DischargeDetailDto } from './discharge-detail.dto';

import { DischargeDetailScheduledDto } from './discharge-detail-scheduled.dto';

import { DischargeStatusDto } from './discharge-status.dto';

import { EventDto } from './event.dto';

import { InventoryMovementDto } from './inventory-movement.dto';

import { MeasureDto } from './measure.dto';

import { MeasureUnitDto } from './measure-unit.dto';

import { PriceCategoryDto } from './price-category.dto';

import { ProductDto } from './product.dto';

import { ProductMaintenanceStepDto } from './product-maintenance-step.dto';

import { ProductTypeDto } from './product-type.dto';

import { VehicleDto } from './vehicle.dto';

import { WarehouseDto } from './warehouse.dto';

import { ProductMaintenanceStepDetailDto } from './product-maintenance-step-detail.dto';

import { ProductPriceDto } from './product-price.dto';

import { WarehouseAddressDto } from './warehouse-address.dto';

import { WarehouseEventDto } from './warehouse-event.dto';

import { WarehouseTypeDto } from './warehouse-type.dto';

import { WarehouseVehicleDto } from './warehouse-vehicle.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class IndexDto{
	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}