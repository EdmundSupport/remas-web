import { WarehouseInterface } from './warehouse.interface';

import { WarehouseVehicleInterface } from './warehouse-vehicle.interface';

import { PaginationInterface } from './pagination.interface';
export interface VehicleInterface{
	uuid: string;

	plate: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	warehouses: WarehouseInterface[];

	warehouseVehicles: WarehouseVehicleInterface[];

	pagination: PaginationInterface;
}