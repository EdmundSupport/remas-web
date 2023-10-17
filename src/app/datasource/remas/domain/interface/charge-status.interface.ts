import { ChargeInterface } from "./charge.interface";

export interface ChargeStatusInterface {

        uuid: string;

        keyName: string;

        name: string;

        condition: boolean;

        createdAt: Date;

        updatedAt: Date;

        charges: ChargeInterface[];
}