import { ChargeInterface } from "./charge.interface";
import { DischargeInterface } from "./discharge.interface";
import { PaginationInterface } from "./pagination.interface";
import { PersonInterface } from "./person.interface";

export interface UserInterface {
    uuid: string;
    name: string;
    password: string;
    condition: boolean;
    roleUuid: string;
    createdAt: Date;
    updatedAt: Date;
    persons: PersonInterface[];
    charges: ChargeInterface[];
    discharges: DischargeInterface[];
    pagination: PaginationInterface;
}