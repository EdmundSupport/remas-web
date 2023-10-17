import { ProductInterface } from "./product.interface";
import { MaintenanceInterface } from "./maintenance.interface";
import { ProductMaintenanceStepInterface } from "./product-maintenance-step.interface";
import { MaintenanceStepDetailInterface } from "./maintenance-step-detail.interface";

export interface MaintenanceStepInterface{
    uuid: string;
    maintenanceUuid: string;
    productMaintenanceStepUuid: string;
    condition: boolean;
    createdAt: Date;
    updatedAt: Date;
    maintenance: MaintenanceInterface;
    productMaintenanceStep: ProductMaintenanceStepInterface;
    maintenanceStepDetails: MaintenanceStepDetailInterface[];
}