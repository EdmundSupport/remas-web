import { WarehouseInterface } from './warehouse.interface';

import { VehicleInterface } from './vehicle.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
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