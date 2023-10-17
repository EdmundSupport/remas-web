import { MaintenanceDetailInterface, MaintenanceInterface } from "./maintenance.interface";

export interface CreateMaintenanceDetailInterface
    extends Partial<
        Omit<MaintenanceDetailInterface, 'description' | 'amount' | 'price' | 'maintenanceUuid' | 'measureUnitUuid' | 'priceCategoryUuid'>> {
    description: string;
    amount: string;
    price: string;
    maintenanceUuid: string;
    measureUnitUuid: string;
    priceCategoryUuid: string;
}
export interface CreateMaintenanceInterface
    extends Partial<
        Omit<MaintenanceInterface, 'maintenanceDetails' | 'number' | 'date' | 'clientUuid'>> {
    number: string;
    date: Date;
    clientUuid: string;
    maintenanceDetails: CreateMaintenanceDetailInterface[];
}