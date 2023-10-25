import { VehicleInterface } from './vehicle.interface';

import { WarehouseVehicleInterface } from './warehouse-vehicle.interface';

import { EventInterface } from './event.interface';

import { WarehouseEventInterface } from './warehouse-event.interface';

import { AddressInterface } from './../contact/address.interface';

import { WarehouseAddressInterface } from './warehouse-address.interface';

import { WarehouseTypeInterface } from './warehouse-type.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface WarehouseInterface{
	uuid: string;

	name: string;

	addressUuid: string;

	warehouseTypeUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	vehicles: VehicleInterface[];

	events: EventInterface[];

	addresses: AddressInterface[];

	warehouseVehicles: WarehouseVehicleInterface[];

	warehouseEvents: WarehouseEventInterface[];

	warehouseAddresses: WarehouseAddressInterface[];

	warehouseType: WarehouseTypeInterface;

	pagination: PaginationInterface;
}