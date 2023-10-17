import { ChargeInterface } from "./charge.interface";
import { ProductInterface } from "./product.interface";
import { MeasureUnitInterface } from "./measure-unit.interface";
import { ChargeDetailScheduledInterface } from "./charge-detail-scheduled.interface";

export interface ChargeDetailInterface {

    uuid: string;

    chargeUuid: string;

    amount: string;

    price: string;

    measureUnitUuid: string;

    condition: boolean;

    createdAt: Date;

    updatedAt: Date;

    charge: ChargeInterface;

    measureUnit: MeasureUnitInterface;

    chargeDetailScheduled: ChargeDetailScheduledInterface;
}