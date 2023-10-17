import { DischargeInterface } from "./discharge.interface";
import { ProductInterface } from "./product.interface";
import { MeasureUnitInterface } from "./measure-unit.interface";
import { DischargeDetailScheduledInterface } from "./discharge-detail-scheduled.interface";
import { PaginationInterface } from "./pagination.interface";

export interface DischargeDetailInterface {

    uuid: string;

    dischargeDetailScheduledUuid: string;

    amount: string;


    measureUnitUuid: string;

    condition: boolean;

    createdAt: Date;

    updatedAt: Date;

    discharge: DischargeInterface;

    measureUnit: MeasureUnitInterface;

    dischargeDetailScheduled: DischargeDetailScheduledInterface;

    pagination: PaginationInterface;
}