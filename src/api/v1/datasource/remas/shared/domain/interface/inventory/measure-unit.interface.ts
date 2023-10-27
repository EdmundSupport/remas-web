import { MeasureInterface } from './measure.interface';

import { ProductPriceInterface } from './product-price.interface';

import { ProductMaintenanceStepDetailInterface } from './product-maintenance-step-detail.interface';

import { ChargeDetailScheduledInterface } from './charge-detail-scheduled.interface';

import { ChargeDetailInterface } from './charge-detail.interface';

import { DischargeDetailScheduledInterface } from './discharge-detail-scheduled.interface';

import { DischargeDetailInterface } from './discharge-detail.interface';

import { ProductPackageInterface } from './product-package.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface MeasureUnitInterface{
	uuid: string;

	keyName: string;

	name: string;

	factorConversion: string;

	measureUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	measure: MeasureInterface;

	productPrices: ProductPriceInterface[];

	productMaintenanceStepDetails: ProductMaintenanceStepDetailInterface[];

	chargeDetailScheduleds: ChargeDetailScheduledInterface[];

	chargeDetails: ChargeDetailInterface[];

	dischargeDetailScheduleds: DischargeDetailScheduledInterface[];

	dischargeDetails: DischargeDetailInterface[];

	productPackages: ProductPackageInterface[];

	pagination: PaginationInterface;
}