import { MaintenanceStatusInterface } from "./maintenance-status.interface";
import { MaintenanceStepInterface } from "./maintenance-step.interface";
import { ProductInterface } from "./product.interface";

export interface MaintenanceInterface{
    uuid: string;
    number: string;
    dateStartScheduled: Date;
    dateEndScheduled: Date;
    dateStart: Date;
    dateEnd: Date;
    userUuid: string;
    maintenanceStatusUuid: string;
    condition: boolean;
    createdAt: Date;
    updatedAt: Date;
    productUuid: string;
    // TODO crear interface de user
    // User: UserInterface;
    product: ProductInterface;
    maintenanceStatus: MaintenanceStatusInterface;
    maintenanceSteps: MaintenanceStepInterface[];
}