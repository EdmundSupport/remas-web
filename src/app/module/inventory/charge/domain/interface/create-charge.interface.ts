import { ChargeDetailScheduledInterface } from "src/app/datasource/remas/domain/interface/charge-detail-scheduled.interface";
import { ChargeDetailInterface } from "src/app/datasource/remas/domain/interface/charge-detail.interface";
import { ChargeInterface } from "src/app/datasource/remas/domain/interface/charge.interface";

export interface CreateChargeDetailInterface extends Partial<Omit<ChargeDetailInterface, 'amount'| 'price'| 'measureUnitUuid'>> {
    amount: string;

    price: string;

    measureUnitUuid: string;
}
export interface CreateChargeDetailScheduledInterface extends Partial<Omit<ChargeDetailScheduledInterface, 'amount'| 'price'| 'productUuid'| 'measureUnitUuid'| 'chargeDetails'>> {
    amount: string;

    price: string;

    productUuid: string;

    measureUnitUuid: string;

    chargeDetails: CreateChargeDetailInterface[];
}
export interface CreateChargeInterface extends Partial<Omit<ChargeInterface, 'number'| 'dateStartScheduled'| 'dateEndScheduled'| 'dateStart'| 'dateEnd'| 'chargeDetailScheduleds'>> {
    number: number;

    dateStartScheduled: Date;

    dateEndScheduled: Date;

    dateStart: Date;

    dateEnd: Date;

    chargeDetailScheduleds: CreateChargeDetailScheduledInterface[];
}