import { MaintenanceStepInterface } from "./maintenance-step.interface";
import { PaginationInterface } from "./pagination.interface";
import { ProductMaintenanceStepDetailInterface } from "./product-maintenance-step-detail.interface";
import { ProductInterface } from "./product.interface";

export interface ProductMaintenanceStepInterface {
    uuid: string;
    order: string;
    description: string;
    productUuid: string;
    condition: boolean;
    createdAt: Date;
    updatedAt: Date;
    product: ProductInterface;
    productMaintenanceStepDetails: ProductMaintenanceStepDetailInterface[];
    maintenanceSteps: MaintenanceStepInterface[];
    pagination: PaginationInterface;
}