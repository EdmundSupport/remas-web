import { DischargeDetailScheduledInterface } from "src/app/datasource/remas/domain/interface/discharge-detail-scheduled.interface";
import { DischargeDetailInterface } from "src/app/datasource/remas/domain/interface/discharge-detail.interface";
import { DischargeInterface } from "src/app/datasource/remas/domain/interface/discharge.interface";

export interface CreateDischargeDetailInterface extends Partial<Omit<DischargeDetailInterface, 'amount'| 'price'| 'measureUnitUuid'>> {
    amount: string;


    measureUnitUuid: string;
}
export interface CreateDischargeDetailScheduledInterface extends Partial<Omit<DischargeDetailScheduledInterface, 'amount'| 'price'| 'productUuid'| 'measureUnitUuid'| 'dischargeDetails'>> {
    amount: string;


    productUuid: string;

    measureUnitUuid: string;

    dischargeDetails: CreateDischargeDetailInterface[];
}
export interface CreateDischargeInterface extends Partial<Omit<DischargeInterface, 'number'| 'dateStartScheduled'| 'dateEndScheduled'| 'dateStart'| 'dateEnd'| 'dischargeDetailScheduleds'>> {
    number: number;

    dateStartScheduled: Date;

    dateEndScheduled: Date;

    dateStart: Date;

    dateEnd: Date;

    dischargeDetailScheduleds: CreateDischargeDetailScheduledInterface[];
}