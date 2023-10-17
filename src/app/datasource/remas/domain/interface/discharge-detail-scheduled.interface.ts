import { DischargeInterface } from "./discharge.interface";
import { ProductInterface } from "./product.interface";
import { MeasureUnitInterface } from "./measure-unit.interface";
import { DischargeDetailInterface } from "./discharge-detail.interface";

export interface DischargeDetailScheduledInterface {

        uuid: string;

        dischargeUuid: string;

        amount: string;

        price: string;

        productUuid: string;

        measureUnitUuid: string;

        condition: boolean;

        createdAt: Date;

        updatedAt: Date;

        discharge: DischargeInterface;

        product: ProductInterface;

        measureUnit: MeasureUnitInterface;

        dischargeDetails: DischargeDetailInterface[];
}