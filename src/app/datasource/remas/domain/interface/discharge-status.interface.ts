import { DischargeInterface } from "./discharge.interface";

export interface DischargeStatusInterface {

        uuid: string;

        keyName: string;

        name: string;

        condition: boolean;

        createdAt: Date;

        updatedAt: Date;

        discharges: DischargeInterface[];
}