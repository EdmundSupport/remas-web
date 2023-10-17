import { ChargeDetailScheduledInterface } from "./charge-detail-scheduled.interface";
import { ChargeDetailInterface } from "./charge-detail.interface";
import { DischargeDetailScheduledInterface } from "./discharge-detail-scheduled.interface";
import { DischargeDetailInterface } from "./discharge-detail.interface";
import { MeasureInterface } from "./measure.interface";
import { PaginationInterface } from "./pagination.interface";
import { ProductPriceInterface } from "./product-price.interface";

export interface MeasureUnitInterface {
    uuid: string;
    keyName: string;
    name: string;
    parentUuid: string;
    measureUuid: string;
    condition: boolean;
    createdAt: Date;
    updatedAt: Date;
    measure: MeasureInterface;
    measureUnits: MeasureUnitInterface[];
    measureUnit: MeasureUnitInterface;
    productPrices: ProductPriceInterface[];
    chargeDetailsScheduled?: ChargeDetailScheduledInterface[];
    chargeDetails?: ChargeDetailInterface[];
    dischargeDetailsScheduled?: DischargeDetailScheduledInterface[];
    dischargeDetails?: DischargeDetailInterface[];
    pagination: PaginationInterface
}