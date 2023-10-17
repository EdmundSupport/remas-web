import { DischargeInterface } from "./discharge.interface";
import { PaginationInterface } from "./pagination.interface";

export interface DischargeStatusInterface {

        uuid: string;

        keyName: string;

        name: string;

        condition: boolean;

        createdAt: Date;

        updatedAt: Date;

        discharges: DischargeInterface[];

        pagination: PaginationInterface;
}