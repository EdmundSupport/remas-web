import { UserInterface } from "./user.interface";
import { DischargeStatusInterface } from "./discharge-status.interface";
import { DischargeDetailScheduledInterface } from "./discharge-detail-scheduled.interface";

export interface DischargeInterface {

        uuid: string;

        number: string;

        dateStartScheduled: Date;

        dateEndScheduled: Date;

        dateStart: Date;

        dateEnd: Date;

        userUuid: string;

        dischargeStatusUuid: string;

        condition: boolean;

        createdAt: Date;

        updatedAt: Date;

        dischargeStatus: DischargeStatusInterface;

        user: UserInterface;

        dischargeDetailScheduleds: DischargeDetailScheduledInterface[];
}