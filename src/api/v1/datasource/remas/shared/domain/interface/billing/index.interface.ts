import { BinnacleInterface } from './binnacle.interface';

import { ClientInterface } from './client.interface';

import { MaintenanceInterface } from './maintenance.interface';

import { MaintenanceStatusInterface } from './maintenance-status.interface';

import { MaintenanceStepInterface } from './maintenance-step.interface';

import { MaintenanceStepDetailInterface } from './maintenance-step-detail.interface';

import { QuotationInterface } from './quotation.interface';

import { QuotationChargeInterface } from './quotation-charge.interface';

import { QuotationDetailInterface } from './quotation-detail.interface';

import { QuotationMaintenanceInterface } from './quotation-maintenance.interface';

import { QuotationStatusInterface } from './quotation-status.interface';

import { SupplierInterface } from './supplier.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface IndexInterface{
	pagination: PaginationInterface;
}