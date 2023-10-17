import { MaintenanceStepInterface } from "./maintenance-step.interface";
import { ProductInterface } from "./product.interface";
import { MeasureUnitInterface } from "./measure-unit.interface";
import { ProductMaintenanceStepDetailInterface } from "./product-maintenance-step-detail.interface";

export interface MaintenanceStepDetailInterface{
    uuid: string;
    amount: string;
    price: string;
    maintenanceStepUuid: string;
    measureUnitUuid: string;
    productMaintenanceStepDetailUuid: string;
    condition: boolean;
    createdAt: Date;
    updatedAt: Date;
    maintenanceStep: MaintenanceStepInterface;
    productMaintenanceStepDetail: ProductMaintenanceStepDetailInterface;
    measureUnit: MeasureUnitInterface;
}