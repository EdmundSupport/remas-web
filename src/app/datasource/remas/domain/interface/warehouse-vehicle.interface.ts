import { WarehouseInterface } from './warehouse.interface';

import { VehicleInterface } from './vehicle.interface';

import { PaginationInterface } from './pagination.interface';
export interface WarehouseVehicleInterface{
	uuid: string;

	vehicleUuid: string;

	warehouseUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	warehouse: WarehouseInterface;

	vehicle: VehicleInterface;

	pagination: PaginationInterface;
}