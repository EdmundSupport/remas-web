import { MaintenanceInterface } from "./maintenance.interface";

export interface MaintenanceStatusInterface{
    uuid: string;
    keyName: string;
    name: string;
    condition: boolean;
    createdAt: Date;
    updatedAt: Date;
    maintenances: MaintenanceInterface[];
}