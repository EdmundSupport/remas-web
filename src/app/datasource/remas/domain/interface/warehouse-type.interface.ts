import { WarehouseInterface } from './warehouse.interface';

import { PaginationInterface } from './pagination.interface';
export interface WarehouseTypeInterface{
	uuid: string;

	key: string;

	name: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	warehouses: WarehouseInterface[];

	pagination: PaginationInterface;
}