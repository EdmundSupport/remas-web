import { UserInterface } from "./user.interface";
import { ChargeStatusInterface } from "./charge-status.interface";
import { ChargeDetailScheduledInterface } from "./charge-detail-scheduled.interface";

export interface ChargeInterface {

        uuid: string;

        number: string;

        dateStartScheduled: Date;

        dateEndScheduled: Date;

        dateStart: Date;

        dateEnd: Date;

        userUuid: string;

        chargeStatusUuid: string;

        condition: boolean;

        createdAt: Date;

        updatedAt: Date;

        chargeStatus: ChargeStatusInterface;

        user: UserInterface;

        chargeDetailScheduleds: ChargeDetailScheduledInterface[];
}