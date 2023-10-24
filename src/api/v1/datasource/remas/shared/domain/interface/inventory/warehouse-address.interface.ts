import { WarehouseInterface } from './warehouse.interface';

import { AddressInterface } from './../contact/address.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
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