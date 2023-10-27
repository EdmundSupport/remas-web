import { WarehouseInterface } from './warehouse.interface';

import { AddressInterface } from './address.interface';

import { PaginationInterface } from './pagination.interface';
export interface WarehouseAddressInterface{
	uuid: string;

	addressUuid: string;

	warehouseUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	warehouse: WarehouseInterface;

	address: AddressInterface;

	pagination: PaginationInterface;
}