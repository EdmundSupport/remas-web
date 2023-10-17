import { ChargeInterface } from "./charge.interface";
import { ProductInterface } from "./product.interface";
import { MeasureUnitInterface } from "./measure-unit.interface";
import { ChargeDetailScheduledInterface } from "./charge-detail-scheduled.interface";
import { PaginationInterface } from "./pagination.interface";

export interface ChargeDetailInterface {

    uuid: string;

    chargeDetailScheduledUuid: string;

    amount: string;

    price: string;

    measureUnitUuid: string;

    condition: boolean;

    createdAt: Date;

    updatedAt: Date;

    charge: ChargeInterface;

    measureUnit: MeasureUnitInterface;

    chargeDetailScheduled: ChargeDetailScheduledInterface;

    pagination: PaginationInterface;
}