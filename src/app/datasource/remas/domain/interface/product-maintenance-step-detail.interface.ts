import { MaintenanceStepDetailInterface } from "./maintenance-step-detail.interface";
import { MeasureUnitInterface } from "./measure-unit.interface";
import { PaginationInterface } from "./pagination.interface";
import { ProductMaintenanceStepInterface } from "./product-maintenance-step.interface";
import { ProductInterface } from "./product.interface";

export interface ProductMaintenanceStepDetailInterface{
    uuid: string;
    amount: string;
    price: string;
    productMaintenanceStepUuid: string;
    productUuid: string;
    measureUnitUuid: string;
    condition: boolean;
    createdAt: Date;
    updatedAt: Date;
    product: ProductInterface;
    maintenanceStepDetails: MaintenanceStepDetailInterface[];
    measureUnit: MeasureUnitInterface;
    productMaintenanceStep: ProductMaintenanceStepInterface;
    pagination: PaginationInterface;
}