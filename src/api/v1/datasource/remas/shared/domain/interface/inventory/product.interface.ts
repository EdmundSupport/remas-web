import { MeasureInterface } from './measure.interface';

import { ProductTypeInterface } from './product-type.interface';

import { ProductPriceInterface } from './product-price.interface';

import { ProductMaintenanceStepInterface } from './product-maintenance-step.interface';

import { ProductMaintenanceStepDetailInterface } from './product-maintenance-step-detail.interface';

import { ChargeDetailScheduledInterface } from './charge-detail-scheduled.interface';

import { DischargeDetailScheduledInterface } from './discharge-detail-scheduled.interface';

import { ProductPackageInterface } from './product-package.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface ProductInterface{
	uuid: string;

	sku: string;

	name: string;

	description: string;

	priceCost: string;

	measureUuid: string;

	productTypeUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	measure: MeasureInterface;

	productType: ProductTypeInterface;

	productPrices: ProductPriceInterface[];

	productMaintenanceSteps: ProductMaintenanceStepInterface[];

	productMaintenanceStepDetails: ProductMaintenanceStepDetailInterface[];

	chargeDetailScheduleds: ChargeDetailScheduledInterface[];

	dischargeDetailScheduleds: DischargeDetailScheduledInterface[];

	productPackage: ProductPackageInterface;

	productPackages: ProductPackageInterface[];

	pagination: PaginationInterface;
}