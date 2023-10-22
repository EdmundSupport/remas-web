import { BinnacleInterface } from './binnacle.interface';

import { ChargeInterface } from './charge.interface';

import { ChargeDetailInterface } from './charge-detail.interface';

import { ChargeDetailScheduledInterface } from './charge-detail-scheduled.interface';

import { ChargeStatusInterface } from './charge-status.interface';

import { DischargeInterface } from './discharge.interface';

import { DischargeDetailInterface } from './discharge-detail.interface';

import { DischargeDetailScheduledInterface } from './discharge-detail-scheduled.interface';

import { DischargeStatusInterface } from './discharge-status.interface';

import { InventoryMovementInterface } from './inventory-movement.interface';

import { MeasureInterface } from './measure.interface';

import { MeasureUnitInterface } from './measure-unit.interface';

import { PriceCategoryInterface } from './price-category.interface';

import { ProductInterface } from './product.interface';

import { ProductMaintenanceStepInterface } from './product-maintenance-step.interface';

import { ProductMaintenanceStepDetailInterface } from './product-maintenance-step-detail.interface';

import { ProductPriceInterface } from './product-price.interface';

import { ProductTypeInterface } from './product-type.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface IndexInterface{
	pagination: PaginationInterface;
}