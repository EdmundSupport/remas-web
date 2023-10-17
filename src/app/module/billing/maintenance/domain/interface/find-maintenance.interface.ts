import { MaintenanceInterface } from "src/app/datasource/remas/domain/interface/maintenance.interface";

export interface FindMaintenanceInterface extends Omit<MaintenanceInterface, 'date'> {
    date: Date | [Date, Date]
}